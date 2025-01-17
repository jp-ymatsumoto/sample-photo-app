import PhotoPagination from "@/components/PhotoPagination";
import { getCategories } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const CategoriesPage: FC<Props> = async ({ searchParams }) => {
  const { page } = searchParams;

  const categories = await getCategories(page ? parseInt(page.toString()) : 1);
  // console.log(categories);

  return (
    <div className="flex flex-col items-center py-2 px-2">
      <h2 className="text-lg font-bold">カテゴリ一覧ページ</h2>
      <div className="grid grid-cols-3 gap-2">
        {categories &&
          categories.data.map((category) => (
            <div key={category.id} className="aspect-square">
              <Link href={`/categories/${category.attributes.name}`} className="w-full h-full">
                <Image
                  src={`http://localhost:1337${category.attributes.image.data.attributes.url}`}
                  alt={category.attributes.name}
                  width={512}
                  height={512}
                  quality={50}
                  className="w-full h-full object-cover rounded-xl"
                />
              </Link>
            </div>
          ))}
      </div>
      {categories ? <PhotoPagination meta={categories.meta} pathname={`/categories`} /> : null}
    </div>
  );
};

export default CategoriesPage;
