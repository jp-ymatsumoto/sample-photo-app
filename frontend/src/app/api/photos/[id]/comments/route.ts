import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 写真のコメントを取得する
// GET /api/photos/:id/comments
export async function GET(request: Request, params: { params: { id: string } }) {
  const { id } = params.params;

  const response = await fetch(
    `http://localhost:1337/api/comments?pagination[pageSize]=19&filters[photo][$eq]=${id}&populate=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();

  return NextResponse.json(
    { data: responseData.data.map((item: unknown) => item) },
    { status: 200 }
  );
}

// 写真にコメントをする
// POST /api/photos/:id/comments
export async function POST(request: Request, params: { params: { id: string } }) {
  const { id } = params.params;
  const jwtToken = cookies().get("jwt");
  const userToken = cookies().get("user");

  if (!jwtToken || !userToken) {
    return new Response(null, { status: 401 });
  }

  // jsonデータを取得する
  const body = await request.json();

  if (!body.data.comment) {
    return new Response(null, { status: 400 });
  }

  const response = await fetch(`http://localhost:1337/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken.value}`,
    },
    body: JSON.stringify({
      data: {
        photo: id,
        user: Number(userToken.value),
        comment: body.data.comment,
      },
    }),
  });
  const { data } = await response.json();

  return NextResponse.json({ data: data }, { status: response.status });
}
