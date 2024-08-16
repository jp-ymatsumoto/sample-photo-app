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

export type PhotoResponse = {
  data: Photo[];
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
      data?: User;
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
