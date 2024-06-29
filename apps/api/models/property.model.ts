import { Property, Room, RoomAvailability } from "@prisma/client";

export type GetPropertiesReq = {
  id: string;
};

export type GetDetailPropertyReq = {
  id: string;
  pId: string;
};

export type AddUPropertyReq = {
  email: string;
  name: string;
  description: string;
  location: string;
  image: string;
  propertyCategoryId: number;
};

export type UpdatePropertyReq = {
  name?: string;
  description?: string;
  location?: string;
  image?: string;
  propertyCategoryId?: number;
};

export type UpdatePropertyPar = {
  id: string;
  pId: string;
};

export type AddUPropertyRes = {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  propertyCategoryId: number;
};

type Rooms = {
  roomAvailabilities: RoomAvailability[]
} & Room

type GetPropertyRoomsRes = {
  rooms: Rooms[]
} & Property

export const toGetPropertiesRes = (property: AddUPropertyRes[]) => {
  return property;
};

export const toGetDetailPropertyRes = (property: AddUPropertyRes) => {
  return property;
};

export const toAddPropertyRes = (property: AddUPropertyRes) => {
  return {
    ...property,
  };
};

export const toDeletePropertyRes = (id: string) => {
  return {
    id,
  };
};

export const toGetPropertyRoomsRes = (propertyRooms: GetPropertyRoomsRes[]) => {
  return propertyRooms.map((pr) => {
    return {
      name: pr.name,
      rooms: pr.rooms.map((r) => {
        return {
          id: r.id,
          type: r.type,
          roomAvailabilitiesId: r.roomAvailabilities.map((ra) => ra.id)[0]
        }
      })
    }
  })
}
