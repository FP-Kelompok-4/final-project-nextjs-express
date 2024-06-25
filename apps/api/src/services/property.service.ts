import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import {
  AddUPropertyReq,
  GetPropertiesReq,
  toAddPropertyRes,
  toGetPropertiesRes,
} from 'models/property.model';

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
}
