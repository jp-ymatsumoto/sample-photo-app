import Strapi from "strapi-sdk-js";
import { PhotoCategoryResponse, PhotoResponse, User } from "@/types";

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

export async function getPhotosAll(): Promise<PhotoResponse | null> {
  try {
    const response: PhotoResponse = await strapi.find("photos", {
      pagination: { page: 1, pageSize: 25 },
      populate: "*",
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
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUser(useranme: string): Promise<User | null> {
  try {
    const response = await strapi.find("users", {
      filters: { username: useranme },
    });
    // console.log(response);
    if (!Array.isArray(response)) {
      return null;
    }
    if (response.length === 0) {
      return null;
    }
    return response[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProfile(jwt: string) {
  const URL = process.env.STRAPI_URL ?? "http://localhost:1337";
  try {
    const response = await fetch(`${URL}/api/users/me?fields[0]=username`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
