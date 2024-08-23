import Strapi from "strapi-sdk-js";
import type { PhotoCategoryResponse, PhotoResponse, PhotosResponse, User } from "@/types";

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

export async function getPhoto(id: number): Promise<PhotoResponse | null> {
  try {
    const response: PhotoResponse = await strapi.findOne("photos", id, {
      populate: "*",
      fields: ["title", "description"],
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPhotosAll(
  username?: string,
  page: number = 1
): Promise<PhotosResponse | null> {
  try {
    if (username) {
      const response: PhotosResponse = await strapi.find("photos", {
        pagination: { page: 1, pageSize: 2 },
        filters: { user: { username: username } },
        fields: ["title"],
        populate: {
          image: {
            fields: ["url"],
          },
        },
      });
      return response;
    } else {
      const response: PhotosResponse = await strapi.find("photos", {
        pagination: { page: page, pageSize: 2 },
        populate: "*",
      });
      return response;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCategoryPhotosAll(
  categoryName: string,
  page = 1
): Promise<PhotosResponse | null> {
  try {
    const response: PhotosResponse = await strapi.find("photos", {
      pagination: { page: page, pageSize: 3 },
      filters: { category: { name: categoryName } },
      fields: ["title"],
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
