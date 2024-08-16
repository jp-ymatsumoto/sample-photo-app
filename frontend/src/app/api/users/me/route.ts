import { getProfile } from "@/lib/strapi";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = cookies().get("jwt");
  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    const user = await getProfile(token.value);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
