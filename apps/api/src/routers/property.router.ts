import { PropertyController } from '@/controllers/property.controller';
import { uploaderSingle } from '@/middlewares/upload-single';
import { validatAddProperty } from '@/validation/property.valiadtion';

import { Router } from 'express';

export class PropertyRouter {
  private router: Router;
  private propertyController: PropertyController;

  constructor() {
    this.propertyController = new PropertyController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      validatAddProperty,
      this.propertyController.addProperty,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
