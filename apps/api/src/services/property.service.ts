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

    const property = await prisma.property.delete({
      where: {
        id: pId,
        userId: id,
      },
    });

    return toDeletePropertyRes(property.id);
  }
}
