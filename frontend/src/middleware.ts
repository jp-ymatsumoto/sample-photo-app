import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/profile") && user.ok === false) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

async function getAuthToken() {
  const authToken = cookies().get("jwt")?.value;
  return authToken;
}

async function getUserMeLoader() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
  const path = "/api/users/me";

  const url = new URL(path, baseUrl);

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
