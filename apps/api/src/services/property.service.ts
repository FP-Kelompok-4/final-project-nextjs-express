import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import {
  AddUPropertyReq,
  GetDetailPropertyReq,
  GetPropertiesReq,
  toAddPropertyRes,
  toDeletePropertyRes,
  toGetDetailPropertyRes,
  toGetPropertiesRes,
  toGetPropertyRoomsRes,
  UpdatePropertyPar,
  UpdatePropertyReq,
} from 'models/property.model';

interface UpdatePropertyServiceProps
  extends UpdatePropertyReq,
    UpdatePropertyPar {}

export class PropertyService {
  static async getProperty(req: GetPropertiesReq) {
    const { id } = req;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new ResponseError(404, 'User is not exist.');

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

    if (!user) throw new ResponseError(404, 'User is not exist.');

    const property = await prisma.property.findUnique({
      where: {
        id: pId,
        userId: user.id,
      },
    });

    if (!property) throw new ResponseError(404, 'Property is not exist.');

    return toGetDetailPropertyRes(property);
  }

  static async addProperty(req: AddUPropertyReq) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
    });

    if (!user) throw new ResponseError(404, 'User is not exist.');

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

  static async getpropertyRooms(userId: string) {
    const propertyRooms = await prisma.property.findMany({
      include: {
        rooms: {
          include: {
            roomAvailabilities: true
          }
        }
      },
      where: { userId },
      orderBy: {name: "asc"}
    });

    if (propertyRooms.length === 0) throw new ResponseError(404, 'You have not added any property yet.');

    return toGetPropertyRoomsRes(propertyRooms)
  }
}
