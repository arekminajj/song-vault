import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: number | null;
    user: {
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
    };
  }

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
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: number | null;
    user?: {
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
    };
  }
}
