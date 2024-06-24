import { ResponseError } from '@/error/response-error';
import { PropertyService } from '@/services/property.service';
import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';
import { AddUPropertyReq } from 'models/property.model';

export class PropertyController {
  async addProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;

      if (file == undefined) {
        throw new ResponseError(404, 'Image is required');
      }

      const request = req.body as AddUPropertyReq;
      request.image = file.filename;
      request.propertyCategoryId = Number(request.propertyCategoryId);

      await UserService.verifyUserByEmail({ email: request.email });

      const property = await PropertyService.addProperty({ ...request });

      res.status(200).send({
        status: 'success',
        data: property,
      });
    } catch (e) {
      next(e);
    }
  }
}
