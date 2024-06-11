import { UserController } from '@/controllers/user.controller';
import { validateGetUser, validatePostUser, validateVerificationUser } from '@/validation/user.validation';
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
    this.router.post(
      '/',
      validatePostUser,
      this.userController.postUser
    )
    this.router.post(
      '/by-email',
      validateGetUser,
      this.userController.getUserByEmail
    )
    this.router.post(
      '/verification-by-token',
      validateVerificationUser,
      this.userController.verificationUserByToken
    )
  }

  getRouter(): Router {
    return this.router;
  }
}