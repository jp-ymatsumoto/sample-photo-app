import PhotoListSection from "@/components/PhotoListSection";
import { getCategoryPhotosAll } from "@/lib/strapi";
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
      {categoryPhotos ? <PhotoListSection photos={categoryPhotos} /> : <p>投稿写真がありません</p>}
    </div>
  );
};

export default CategoryPhotosPage;
