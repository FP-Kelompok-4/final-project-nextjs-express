import { Property, Room, RoomAvailability } from '@prisma/client';

export type GetPropertiesReq = {
  id: string;
};

export type GetPropertiesQuery = {
  fromDate?: string;
  toDate?: string;
  name?: string;
  sortPrice?: string;
  page?: string;
}

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
  roomAvailabilities: RoomAvailability[];
} & Room;

type GetPropertyRoomsRes = {
  rooms: Rooms[];
} & Property;

type TRooms = {
  id: string;
  image: string;
  description: string;
  type: string;
  roomPrices: {
    price: number;
  } | null;
};

type PropertyRoomPrice = {
  id: string;
  image: string;
  name: string;
  description: string;
  location: string;
  rooms: TRooms[];
};

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
          roomAvailabilitiesId: r.roomAvailabilities.map((ra) => ra.id)[0],
        };
      }),
    };
  });
};

// export const toPropertyRoomPriceRes = (property: PropertyRoomPrice[]) => {
//   return property.map(({ id, name, description, image, location, rooms }) => {
//     return {
//       id,
//       name,
//       description,
//       location,
//       image,
//       price: rooms.map((v, i) => {
//         if (i === 0) {
//           return {
//             price: v.roomPrices?.price,
//           };
//         }
//       })[0]?.price,
//     };
//   });
// };

export const toGetDetailPropertyClientRes = (
  property: PropertyRoomPrice & { category: string },
) => {
  const { id, name, description, location, image, rooms, category } = property;
  return {
    id,
    name,
    description,
    location,
    category,
    image,
    rooms: [
      ...rooms.map(({ id, type, description, image, roomPrices }) => {
        return {
          id,
          type,
          description,
          image,
          price: roomPrices ? roomPrices.price : 0,
        };
      }),
    ],
  };
};
