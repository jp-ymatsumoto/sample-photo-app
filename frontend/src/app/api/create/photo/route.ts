import { getProfile, getUser } from "@/lib/strapi";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // JWTトークンを取得する
  const token = cookies().get("jwt");
  if (!token) {
    return new Response(null, { status: 401 });
  }
  // console.log(token);

  // POSTリクエストのbodyを取得する
  const data = await request.formData();
  // console.log(data);

  if (!data.has("files") || !data.has("data")) {
    return NextResponse.json({ message: "パラメーターが不正です" }, { status: 400 });
  }

  try {
    // 画像をアップロードする
    const formData = new FormData();
    formData.append("files", data.get("files")!);
    const uploadResponse = await fetch("http://localhost:1337/api/upload", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });
    const uploadData = await uploadResponse.json();
    // console.log(uploadData);

    // ユーザー情報を取得する
    const user = await getProfile(token.value);
    // console.log(user);

    // 画像以外の写真データを取得する
    const requestPhotoData = JSON.parse(data.get("data") as string);
    // console.log(requestPhotoData);

    // 写真データを登録する
    const photoResponse = await fetch("http://localhost:1337/api/photos", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          title: requestPhotoData.title,
          description: requestPhotoData.description,
          category: requestPhotoData.category,
          image: uploadData[0].id,
          user: user.id,
        },
      }),
    });

    const photoData = await photoResponse.json();
    // console.log(photoData);
    return NextResponse.json(photoData, { status: photoResponse.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" });
  }
}
