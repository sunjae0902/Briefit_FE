// lib/auth/cookie.ts
import { cookies } from "next/headers";

export async function getAccessTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;
}

export async function isLoggedIn(): Promise<boolean> {
  const token = await getAccessTokenFromCookies();
  return !!token;
}