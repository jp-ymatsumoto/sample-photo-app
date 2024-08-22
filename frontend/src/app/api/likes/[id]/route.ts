import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, params: { params: { id: string } }) {
  const { id } = params.params;
  const jwtToken = cookies().get("jwt");
  const userToken = cookies().get("user");

  if (!jwtToken || !userToken) {
    return new Response(null, { status: 401 });
  }

  const response = await fetch(`http://localhost:1337/api/likes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken.value}`,
    },
  });
  const { data } = await response.json();
  return NextResponse.json({ data: { id: data.id } }, { status: response.status });
}
