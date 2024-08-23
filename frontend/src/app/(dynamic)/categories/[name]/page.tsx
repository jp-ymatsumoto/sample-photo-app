import PhotoListSection from "@/components/PhotoListSection";
import PhotoPagination from "@/components/PhotoPagination";
import { getCategoryPhotosAll } from "@/lib/strapi";
import { FC } from "react";

type Props = {
  params: {
    name: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const CategoryPhotosPage: FC<Props> = async ({ params, searchParams }) => {
  const { name } = params;
  const { page } = searchParams;

  const categoryPhotos = await getCategoryPhotosAll(name, page ? parseInt(page.toString()) : 1);
  // console.log(categoryPhotos);

  return (
    <div className="flex flex-col border-t-2 px-5 py-2">
      <h2 className="text-lg font-bold">{name}の写真一覧</h2>
      {categoryPhotos ? <PhotoListSection photos={categoryPhotos} /> : <p>投稿写真がありません</p>}
      {categoryPhotos ? (
        <PhotoPagination meta={categoryPhotos.meta} pathname={`/categories/${name}`} />
      ) : null}
    </div>
  );
};

export default CategoryPhotosPage;
