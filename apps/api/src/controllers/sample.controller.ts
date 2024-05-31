import { NextFunction, Request, Response } from 'express';
import { SampleService } from '@/services/sample.service';

export class SampleController {
  async getSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await SampleService.getSamplesData();

      res.status(200).send({
        data: response
      })
    } catch (e) {
      next(e)
    }
  }

  async getSampleDataById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const response = await SampleService.getSampleDataById({ id });

      return res.status(200).send({
        data: response
      });
    } catch (e) {
      next(e)
    }
  }

  async createSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, code } = req.body;

      const newSampleData = await SampleService.addSampleData({ name, code });

      return res.status(201).send({
        data: newSampleData
      });
    } catch (e) {
      next(e)
    }
  }
}
