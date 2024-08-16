import { getCategoryPhotosAll } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  params: {
    name: string;
  };
};

const CategoryPhotosPage: FC<Props> = async ({ params }) => {
  const { name } = params;

  const categoryPhotos = await getCategoryPhotosAll(name);
  console.log(categoryPhotos);

  return (
    <div className="flex flex-col border-t-2 px-5 py-2">
      <h2 className="text-lg font-bold">{name}の写真一覧</h2>
      <div className="grid grid-cols-3 gap-2">
        {categoryPhotos ? (
          categoryPhotos.data.map((photo) => (
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
  );
};

export default CategoryPhotosPage;
