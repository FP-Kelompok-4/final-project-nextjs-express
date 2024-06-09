import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';
import { AddUserReq, UpdateAccountUserReq } from 'models/user.model';

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

  async putAccountUser (req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdateAccountUserReq;

      const user = await UserService.updateAccountUser(request);

      res.status(201).send({
        data: user
      })
    } catch (e) {
      next(e)
    }
  }
}