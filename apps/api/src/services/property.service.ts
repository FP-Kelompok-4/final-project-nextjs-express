import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import {
  AddUPropertyReq,
  GetDetailPropertyReq,
  GetPropertiesReq,
  toAddPropertyRes,
  toDeletePropertyRes,
  toGetDetailPropertyClientRes,
  toGetDetailPropertyRes,
  toGetPropertiesRes,
  toGetPropertyRoomsRes,
  toPropertyRoomPriceRes,
  UpdatePropertyPar,
  UpdatePropertyReq,
} from 'models/property.model';

interface UpdatePropertyServiceProps
  extends UpdatePropertyReq,
    UpdatePropertyPar {}

export class PropertyService {
  static async getPropertiesForClient() {
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        image: true,
        rooms: {
          select: {
            id: true,
            type: true,
            description: true,
            image: true,
            roomPrices: {
              select: { price: true },
            },
            specialPrices: {
              select: { price: true, fromDate: true, toDate: true },
            },
            roomAvailabilities: true
          },
        },
      },
    });

    return toPropertyRoomPriceRes(properties);
  }

  static async getPropertyForClient(req: GetPropertiesReq) {
    const { id } = req;

    const property = await prisma.property.findUnique({
      where: {
        id,
      },
      include: {
        rooms: {
          include: {
            roomPrices: true,
            specialPrices: true,
            roomAvailabilities: true
          },
        },
        propertyCategory: true,
      },
    });

    if (!property) throw new ResponseError(404, 'Property does not exist.');

    const {
      id: pId,
      name,
      description,
      propertyCategory,
      location,
      image,
      rooms,
    } = property;

    const result = {
      id: pId,
      name,
      description,
      category: propertyCategory.name,
      location,
      image,
      rooms,
    };

    return toGetDetailPropertyClientRes(result);
  }

  static async getProperty(req: GetPropertiesReq) {
    const { id } = req;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new ResponseError(404, 'User does not exist.');

    const property = await prisma.property.findMany({
      where: {
        userId: user.id,
      },
    });

    return toGetPropertiesRes(property);
  }

  static async getDetailProperty(req: GetDetailPropertyReq) {
    const { id, pId } = req;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new ResponseError(404, 'User does not exist.');

    const property = await prisma.property.findUnique({
      where: {
        id: pId,
        userId: user.id,
      },
    });

    if (!property) throw new ResponseError(404, 'Property does not exist.');

    return toGetDetailPropertyRes(property);
  }

  static async addProperty(req: AddUPropertyReq) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
    });

    if (!user) throw new ResponseError(404, 'User does not exist.');

    const { name, description, location, propertyCategoryId, image } = req;

    const property = await prisma.property.create({
      data: {
        userId: user.id,
        name,
        description,
        location,
        propertyCategoryId,
        image,
      },
    });

    return toAddPropertyRes({ ...property });
  }

  static async updateProperty(req: UpdatePropertyServiceProps) {
    const { id, pId, name, description, location, propertyCategoryId, image } =
      req;

    const property = await prisma.property.update({
      where: {
        id: pId,
        userId: id,
      },
      data: {
        name,
        description,
        location,
        propertyCategoryId,
        image,
      },
    });

    return toAddPropertyRes({ ...property });
  }

  static async deleteProperty(req: UpdatePropertyPar) {
    const { id, pId } = req;

    const propertyR = await prisma.property.findUnique({
      where: {
        id: pId,
        userId: id,
      },
    });

    if (!propertyR) {
      throw new Error('Property not found or does not belong to the user.');
    }

    // Find all rooms related to the property
    const roomsR = await prisma.room.findMany({
      where: {
        propertyId: pId,
      },
    });

    // Delete all RoomPrice records related to the rooms
    for (const room of roomsR) {
      await prisma.roomPrice.deleteMany({
        where: {
          roomId: room.id,
        },
      });
    }

    // Delete all Room records related to the property
    await prisma.room.deleteMany({
      where: {
        propertyId: pId,
      },
    });

    // Finally, delete the Property
    const propertyD = await prisma.property.delete({
      where: {
        id: pId,
        userId: id,
      },
    });

    return toDeletePropertyRes(propertyD.id);
  }

  static async getPropertyRooms(userId: string) {
    const propertyRooms = await prisma.property.findMany({
      include: {
        rooms: {
          include: {
            roomAvailabilities: true,
          },
        },
      },
      where: { userId },
      orderBy: { name: 'asc' },
    });

    if (propertyRooms.length === 0)
      throw new ResponseError(404, 'You have not added any property yet.');

    return toGetPropertyRoomsRes(propertyRooms);
  }
}
