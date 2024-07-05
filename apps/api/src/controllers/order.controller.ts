import { OrderService } from "@/services/order.service";
import { NextFunction, Request, Response } from "express";

export class OrderController{
  async getOrdersByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const orders = await OrderService.getOrdersByUserId(userId);

      res.status(200).send({
        data: orders
      })
    } catch (e) {
      next(e)
    }
  }
}