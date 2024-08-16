import { getPhotosAll } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";

const PhotoListSection = async () => {
  const photos = await getPhotosAll();
  // console.log(photos);

  return (
    <div className="grid grid-cols-2 gap-2">
      {photos &&
        photos.data.map((photo) => (
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
        ))}
    </div>
  );
};

export default PhotoListSection;