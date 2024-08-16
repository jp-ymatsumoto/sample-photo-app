import { getPhotosAll, getUser } from "@/lib/strapi";
import { User } from "@/types";
import { UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  // ユーザの写真を取得する
  const userPhotos = await getPhotosAll(params.name);
  console.log(userPhotos);

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
        <div className="grid grid-cols-3 gap-2">
          {userPhotos ? (
            userPhotos.data.map((photo) => (
              <div key={photo.id} className="aspect-square">
                <Link href={`/photos/${photo.id}`} className="w-full h-full">
                  {photo.attributes.image.data && (
                    <Image
                      src={`http://localhost:1337${photo.attributes.image.data.attributes.url}`}
                      alt={"投稿写真"}
                      width={512}
                      height={512}
                      quality={50}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </Link>
              </div>
            ))
          ) : (
            <p>投稿写真がありません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPhotosPage;
