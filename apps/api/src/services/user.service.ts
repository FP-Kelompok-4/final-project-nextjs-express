import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import {
  AddUserReq,
  toAddUserRes,
  UpdateAccountUserReq,
  toUpdateAccountUserRes,
} from 'models/user.model';

export class UserService {
  static async addUser(req: AddUserReq) {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
    });

    if (existingEmail) {
      throw new ResponseError(400, 'Email already exist!');
    }

    req.password
      ? (req.password = await bcrypt.hash(req.password, 10))
      : (req.password = null);

    const user = await prisma.user.create({
      data: req,
    });

    return toAddUserRes(user);
  }

  static async updateAccountUser(req: UpdateAccountUserReq) {
    const user = await prisma.user.update({
      where: {
        email: req.email,
      },
      data: { name: req.name, gender: req.gender, birthdate: req.birthdate },
    });

    return toUpdateAccountUserRes(user);
  }
}
