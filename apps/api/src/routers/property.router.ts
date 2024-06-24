import { PropertyController } from '@/controllers/property.controller';
import { PropertyCategoryController } from '@/controllers/propertyCategory.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { uploaderSingle } from '@/middlewares/upload-single';
import { validatAddProperty } from '@/validation/property.valiadtion';

import { Router } from 'express';

export class PropertyRouter {
  private router: Router;
  private propertyController: PropertyController;
  private propertyCategoryController: PropertyCategoryController;

  constructor() {
    this.propertyController = new PropertyController();
    this.propertyCategoryController = new PropertyCategoryController();

    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(verifyToken);

    this.router.post(
      '/',
      validatAddProperty,
      this.propertyController.addProperty,
    );
    this.router.post(
      '/categories',
      validatAddProperty,
      this.propertyCategoryController.getPropertyCategory,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
