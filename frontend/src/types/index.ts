export type PhotoCategoryResponse = {
  data: PhotoCategory[];
};

export type PhotoCategory = {
  id: number;
  attributes: {
    name: string;
    label: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    image: {
      data: Image;
    };
  };
};

export type PhotosResponse = {
  data: Photo[];
} & Meta;
export type PhotoResponse = {
  data: Photo;
};

export type Photo = {
  id: number;
  attributes: {
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    image: {
      data?: Image;
    };
    user: {
      data?: {
        id: number;
        attributes: {
          username: string;
        };
      };
    };
    category: {
      data?: PhotoCategory;
    };
  };
};

export type Image = {
  id: number;
  attributes: {
    url: string;
  };
};

export type User = {
  username: string;
};

export type Meta = {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
