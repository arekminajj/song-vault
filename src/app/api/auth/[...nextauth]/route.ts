import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

// todo: try the @beta version of next-auth for better app component integration

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private",
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

      if (token.expiresAt && Date.now() > token.expiresAt - 60000) {
        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
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
            }
          );

          const refreshedTokens = await response.json();

          if (!response.ok) {
            throw refreshedTokens;
          }

          token.accessToken = refreshedTokens.access_token;
          token.expiresAt =
            Date.now() + (refreshedTokens.expires_in ?? 0) * 1000;
          if (refreshedTokens.refresh_token) {
            token.refreshToken = refreshedTokens.refresh_token;
          }
        } catch (error) {
          console.error("Error refreshing Spotify access token:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
