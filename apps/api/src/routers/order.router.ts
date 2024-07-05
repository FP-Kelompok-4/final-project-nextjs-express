import { OrderController } from "@/controllers/order.controller";
import { tenantGuard, verifyToken } from "@/middlewares/auth.middleware";
import { Router } from "express";

export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.orderController = new OrderController();
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    this.router.use(verifyToken);
    
    this.router.use(tenantGuard);
    this.router.get(
      '/:userId',
      this.orderController.getOrdersByUserId
    );
  }

  getRouter(): Router {
    return this.router;
  }
}