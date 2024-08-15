import { getCategories } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const CategoryListSection = async () => {
  const categories = await getCategories();
  console.log(categories);

  return (
    <div className="flex flex-col items-center max-w-60 gap-y-1">
      <div className="flex flex-row justify-between items-center w-full text-base">
        <h2 className="font-bold">Category</h2>
        <Link className={buttonVariants({ variant: "outline", size: "sm" })} href={"/categories"}>
          カテゴリ一覧へ
        </Link>
      </div>

      <div className="grid grid-cols-3 w-60">
        {categories &&
          categories.data.map((category) => (
            <Image
              key={category.id}
              src={`http://localhost:1337${category.attributes.image.data.attributes.url}`}
              alt={category.attributes.name}
              width={256}
              height={256}
              quality={50}
              className="w-20 h-20 object-cover"
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryListSection;
