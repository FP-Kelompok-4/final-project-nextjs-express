import { UserController } from '@/controllers/user.controller';
import {
  validatePostUser,
  validateGetUser,
  validatePutAccountUser,
} from '@/validation/user.validation';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', validatePostUser, this.userController.postUser);
    this.router.put(
      '/account/:id',
      validatePutAccountUser,
      this.userController.putAccountUser,
    );
    this.router.post(
      '/by-email',
      validateGetUser,
      this.userController.getUserByEmail,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
