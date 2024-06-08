import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';
import { AddUserReq } from 'models/user.model';

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
}