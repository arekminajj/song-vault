import NextAuth, { type DefaultSession } from "next-auth";
import Spotify from "next-auth/providers/spotify";

declare module "next-auth" {
  interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    country?: string | null;
    explicit_content?: {
      filter_enabled?: boolean;
      filter_locked?: boolean;
    } | null;
    external_urls?: {
      spotify?: string;
    } | null;
    followers?: {
      href?: string | null;
      total?: number;
    } | null;
    href?: string | null;
    images?: Array<{ url: string }> | null;
    product?: string | null;
    type?: string | null;
    uri?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: number | null;
  }

  interface Session {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: number | null;
    user: User & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: number | null;
    user?: User;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-top-read,user-read-playback-state,user-modify-playback-state",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
          country: profile.country,
          explicit_content: profile.explicit_content,
          external_urls: profile.external_urls,
          followers: profile.followers,
          href: profile.href,
          images: profile.images,
          product: profile.product,
          type: profile.type,
          uri: profile.uri,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;
        token.user = profile;
      }

      if (Date.now() > (Number(token.expiresAt) ?? 0) - 60000) {
        if (!token.refreshToken) {
          console.warn("No refresh token available, user must re-login");
          return { ...token, accessToken: undefined };
        }
        try {
          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
              ).toString("base64")}`,
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
            }),
          });

          const refreshed = await res.json();
          if (!res.ok) throw refreshed;

          token.accessToken = refreshed.access_token;
          token.expiresAt = Date.now() + (refreshed.expires_in ?? 3600) * 1000;
          if (refreshed.refresh_token)
            token.refreshToken = refreshed.refresh_token;
        } catch (err) {
          console.error("Refresh failed:", err);
          token.accessToken = undefined;
          token.refreshToken = undefined;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      return session;
    },
  },
  pages: {},
});
