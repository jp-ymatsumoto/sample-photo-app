import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 写真のいいねの数を取得する
// GET /api/photos/:id/likes
export async function GET(request: Request, params: { params: { id: string } }) {
  const { id } = params.params;
  const jwtToken = cookies().get("jwt");
  const userToken = cookies().get("user");

  if (!jwtToken || !userToken) {
    return new Response(null, { status: 401 });
  }

  const response = await fetch(
    `http://localhost:1337/api/likes?pagination[withCount]=true&pagination[pageSize]=1&filters[photo][$eq]=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.value}`,
      },
    }
  );
  const responseData = await response.json();

  const data = {
    data: {
      total: responseData.meta.pagination.total,
    },
  };
  return NextResponse.json(data, { status: 200 });
}

// 写真にいいねをする
// POST /api/photos/:id/likes
export async function POST(request: Request, params: { params: { id: string } }) {
  const { id } = params.params;
  const jwtToken = cookies().get("jwt");
  const userToken = cookies().get("user");

  if (!jwtToken || !userToken) {
    return new Response(null, { status: 401 });
  }

  const res = await fetch(
    `http://localhost:1337/api/likes?pagination[withCount]=true&pagination[pageSize]=1&filters[photo][$eq]=${id}&filters[user][$eq]=${userToken.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken.value}`,
      },
    }
  );
  const resData = await res.json();
  // いいねの数が１の場合は既に登録されているのでエラーを返す
  if (resData.data.length === 1) {
    return NextResponse.json(null, { status: 400 });
  }

  const response = await fetch(`http://localhost:1337/api/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken.value}`,
    },
    body: JSON.stringify({
      data: {
        photo: id,
        user: Number(userToken.value),
      },
    }),
  });
  const { data } = await response.json();

  return NextResponse.json({ data: { id: data.id } }, { status: response.status });
}
