import { UserService } from '@/services/user.service';
import { VerificationTokenService } from "@/services/verificationToken.service";
import { NextFunction, Request, Response } from 'express';
import {
  AddUserReq,
  UpdateAccountUserReq,
  GetUserReq,
} from 'models/user.model';

export class UserController {
  async postUser(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as AddUserReq;

      const user = await UserService.addUser(request);

      res.status(201).send({
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async putAccountUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const request = req.body as UpdateAccountUserReq;

      const user = await UserService.updateAccountUser(id, request);

      res.status(201).send({
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as GetUserReq;

      const user = await UserService.getUserByEmail(request);

      res.status(200).send({
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async verificationUserByToken (req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body as { token: string };

      const verificationToken = await VerificationTokenService.getVerificationTokenByToken({ token });

      await UserService.verificationUser({ email: verificationToken.email });

      await VerificationTokenService.deleteVerificationTokenById(verificationToken.id);

      res.status(200).send({
        status: "success"
      })
    } catch (e) {
      next(e)
    }
  }

  async getAccountUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await UserService.getAccountUserById(id);

      res.status(200).send({
        data: user,
      });
    } catch (e) {
      next(e);
    }
  }
}
