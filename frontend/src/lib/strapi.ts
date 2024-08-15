import Strapi from "strapi-sdk-js";
import { PhotoCategoryResponse, User } from "@/types";

export const strapi = new Strapi({
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

export async function getUsers(): Promise<User[] | null> {
  try {
    const response = await strapi.find("users", {
      pagination: { page: 1, pageSize: 3 },
      fields: ["username"],
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
