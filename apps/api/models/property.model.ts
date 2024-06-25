export type GetPropertiesReq = {
  id: string;
};

export type AddUPropertyReq = {
  email: string;
  name: string;
  description: string;
  location: string;
  image: string;
  propertyCategoryId: number;
};

export type AddUPropertyRes = {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  propertyCategoryId: number;
};

export const toGetPropertiesRes = (property: AddUPropertyRes[]) => {
  return property;
};

export const toAddPropertyRes = (property: AddUPropertyRes) => {
  return {
    ...property,
  };
};
