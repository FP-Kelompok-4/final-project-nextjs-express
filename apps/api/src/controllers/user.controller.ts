import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';
import { AddUserReq, GetUserReq } from 'models/user.model';

export class UserController {
  async postUser (req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as AddUserReq;

      const user = await UserService.addUser(request);

      res.status(201).send({
        data: user
      })
    } catch (e) {
      next(e)
    }
  }

  async getUserByEmail (req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as GetUserReq;

      const user = await UserService.getUserByEmail(request);

      res.status(200).send({
        data: user
      })
    } catch (e) {
      next(e)
    }
  }
}