import { PropertyService } from "@/services/property.service";
import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';
import { AddUPropertyReq } from 'models/property.model';

export class PropertyController {
  async addProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as AddUPropertyReq;

      await UserService.verifyUserByEmail({ email: request.email });

      const property = await PropertyService.addProperty(request);
    } catch (e) {
      next(e);
    }
  }
}
