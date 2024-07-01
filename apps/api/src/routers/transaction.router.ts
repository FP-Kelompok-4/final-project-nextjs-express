import { TransactionController } from '@/controllers/transaction.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { validateAddBooking } from '@/validation/transaction.validation';

import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();

    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(verifyToken);

    this.router.post(
      '/booking',
      validateAddBooking,
      this.transactionController.addBoking,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
