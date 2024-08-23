import CategoryListSection from "@/components/CategoryListSection";
import PhotoListSection from "@/components/PhotoListSection";
import PhotoPagination from "@/components/PhotoPagination";
import UserListSection from "@/components/UserListSection";
import { getPhotosAll } from "@/lib/strapi";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page } = searchParams;
  const photos = await getPhotosAll(undefined, page ? parseInt(page.toString()) : 1);

  return (
    <div className="flex flex-row grow">
      {/* 左カラム */}
      <div className="grow flex flex-col py-2 px-2 gap-y-2">
        <h2 className="text-lg font-bold">最新投稿</h2>
        {/* 最新の写真を10件表示する */}
        {photos && <PhotoListSection photos={photos} />}
        {/* ページネーションを表示する */}
        {photos && <PhotoPagination meta={photos.meta} />}
      </div>

      {/* 右カラム */}
      <div className="flex flex-col gap-y-8 p-2 border-l-2">
        <CategoryListSection />
        <UserListSection />
      </div>
    </div>
  );
}
