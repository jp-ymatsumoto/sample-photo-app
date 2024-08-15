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

export type Image = {
  id: number;
  attributes: {
    url: string;
  };
};
