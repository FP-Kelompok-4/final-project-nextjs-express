import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { AddUserReq, toAddUserRes } from 'models/user.model';

export class UserService {
  static async addUser(req: AddUserReq) {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: req.email
      }
    })

    if (existingEmail) {
      throw new ResponseError(400, 'Email already exist!');
    }

    (req.password) ? req.password = await bcrypt.hash(req.password, 10) : req.password = null;

    const user = await prisma.user.create({
      data: req
    })

    return toAddUserRes(user);
  }
}