import { buttonVariants } from "@/components/ui/button";
import { getProfile } from "@/lib/strapi";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

const ProfilePage = async () => {
  const cookieStore = cookies();
  const jwt = cookieStore.has("jwt") ? cookieStore.get("jwt") : null;

  const user = await getProfile(jwt!.value);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ユーザ情報 */}
      <div className="flex flex-row items-center gap-5 px-5 py-10">
        <div className="w-20 h-20 rounded-full">
          <UserCircleIcon size={80} className="fill-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{user && user.username}</h2>
          <hr className="my-2" />
          <Link href={"/profile/edit"} className={buttonVariants({ variant: "outline" })}>
            プロフィールを編集する
          </Link>
        </div>
      </div>

      {/* 写真投稿一覧 */}
      <div className="flex flex-col border-t-2 px-5 py-2">
        <h2 className="text-lg font-bold">投稿写真一覧</h2>
        <div className="">
          {/* TODO: 投稿写真がないことを表示する */}
          <p>投稿写真がありません</p>
          {/* TODO: 投稿写真の一覧を表示する */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
