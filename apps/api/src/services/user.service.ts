import { ResponseError } from '@/error/response-error';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { AddUserReq, GetUserReq, toAddUserRes, toUserRes } from 'models/user.model';

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

    if (req.provider) {
      req.isVerified = true;
    } else {
      req.provider = null;
      req.image = null;
      req.isVerified = false;
    }

    const user = await prisma.user.create({
      data: req
    })

    return toAddUserRes(user);
  }

  static async getUserByEmail(req: GetUserReq) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.email
      }
    })

    if (!user) throw new ResponseError(404, "Email or password is wrong!");

    if (!req.password && user.password) throw new ResponseError(400, "Email or  password is wrong!");

    if (req.password && user.password) {
      const isPasswordValid = await bcrypt.compare(req.password, user.password);

      if (!isPasswordValid) throw new ResponseError(404, "Email or password is wrong!");
    }

    return toUserRes(user)
  }
}