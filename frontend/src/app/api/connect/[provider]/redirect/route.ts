import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const dynamic = "force-dynamic";

export async function GET(request: Request, params: { params: { provider: string } }) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("access_token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const provider = params.params.provider;
  if (provider !== "github") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";
  const path = `/api/auth/${provider}/callback`;
  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  const res = await fetch(url.href);
  const data = await res.json();

  cookies().set("jwt", data.jwt, config);
  cookies().set("user", data.user.id, config);

  return NextResponse.redirect(new URL("/profile", request.url));
}
