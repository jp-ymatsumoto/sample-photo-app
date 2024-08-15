import { getUser } from "@/lib/strapi";
import { User } from "@/types";
import { UserCircleIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  params: {
    name: string;
  };
};

const UserPhotosPage: FC<Props> = async ({ params }) => {
  const { name } = params;
  const user: User | null = await getUser(name);

  if (user === null) {
    return (
      <div className="flex flex-col min-h-screen">
        <div>ユーザが見つかりません</div>
      </div>
    );
  }

  // TODO: ユーザの写真を取得する

  return (
    <div className="flex flex-col min-h-screen">
      {/* ユーザ情報 */}
      <div className="flex flex-row items-center gap-5 px-5 py-10">
        <div className="w-20 h-20 rounded-full">
          <UserCircleIcon size={80} className="fill-white" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{user && user.username}</h2>
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

export default UserPhotosPage;