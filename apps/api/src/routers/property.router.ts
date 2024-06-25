import { PropertyController } from '@/controllers/property.controller';
import { PropertyCategoryController } from '@/controllers/propertyCategory.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { uploaderSingle } from '@/middlewares/upload-single';
import { validatAddProperty, validatGetProperties } from '@/validation/property.valiadtion';

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

    this.router.get(
      '/:id',
      validatGetProperties,
      this.propertyController.getProperty,
    );
    this.router.post(
      '/',
      uploaderSingle('IMG', '/properties').single('image'),
      validatAddProperty,
      this.propertyController.addProperty,
    );
    this.router.get(
      '/categories',
      this.propertyCategoryController.getPropertyCategory,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
