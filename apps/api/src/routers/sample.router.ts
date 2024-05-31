import { SampleController } from '@/controllers/sample.controller';
import { validateCreateSample } from '@/validation/sample.validation';
import { Router } from 'express';

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      this.sampleController.getSampleData
    );
    this.router.get(
      '/:id',
      this.sampleController.getSampleDataById
    );
    this.router.post(
      '/',
      validateCreateSample,
      this.sampleController.createSampleData
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
