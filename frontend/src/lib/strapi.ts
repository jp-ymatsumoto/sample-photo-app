import Strapi from "strapi-sdk-js";
import { PhotoCategory, PhotoCategoryResponse } from "@/types";

const strapi = new Strapi({
  url: process.env.STRAPI_URL ?? "http://localhost:1337",
  store: {
    key: process.env.STRAPI_API_KEY!,
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
});

export async function getCategories(): Promise<PhotoCategoryResponse | null> {
  try {
    const response: PhotoCategoryResponse = await strapi.find("categories", {
      pagination: { page: 1, pageSize: 9 },
      fields: ["id", "name", "label"],
      populate: {
        image: {
          fields: ["url"],
        },
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
