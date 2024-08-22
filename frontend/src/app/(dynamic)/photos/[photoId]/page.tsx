import CommentSection from "@/components/CommentSection";
import LikeButton from "@/components/LikeButton";
import { buttonVariants } from "@/components/ui/button";
import { getPhoto } from "@/lib/strapi";
import { UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  params: {
    photoId: string;
  };
};

const PhotoPage: FC<Props> = async ({ params }) => {
  const { photoId } = params;

  const photo = await getPhoto(Number(photoId));
  console.log(photo);
  console.log(photo?.data.attributes.user);

  return (
    <div className="flex flex-col px-2 py-2">
      <div className="flex flex-row justify-between items-center h-10">
        <h2 className="text-lg font-bold">{photo?.data.attributes.title}</h2>
        <LikeButton photoId={Number(photo?.data.id)} />
      </div>
      {photo?.data.attributes.image.data && (
        <Image
          src={`http://localhost:1337${photo?.data.attributes.image.data?.attributes.url}`}
          alt="投稿写真"
          width={512}
          height={512}
          quality={50}
          className="w-full max-h-96 object-scale-down"
        />
      )}

      <div className="flex flex-row">
        <div className="w-60">
          <h3 className="text-lg font-bold">写真概要</h3>
          <div className="">{photo?.data.attributes.description}</div>
          <h3 className="text-lg font-bold">カテゴリ</h3>
          <Link
            href={`/categories/${photo?.data.attributes.category.data?.attributes.name}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {photo?.data.attributes.category.data?.attributes.label}
          </Link>

          <h3 className="text-lg font-bold">投稿者</h3>
          <div className="flex flex-row">
            <Link
              href={`/users/${photo?.data.attributes.user.data?.attributes.username}`}
              className="hover:bg-slate-100 hover:rounded-md"
            >
              <div className="flex flex-row items-center gap-x-2 py-1">
                <div className="w-h h-10 rounded-full flex justify-center items-center">
                  <UserCircleIcon size={40} className="fill-white" />
                </div>
                <h3>{photo?.data.attributes.user.data?.attributes.username}</h3>
              </div>
            </Link>
          </div>
        </div>

        <div className="grow flex flex-col">
          <CommentSection photoId={Number(photoId)} />
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
