import { ResponseError } from '@/error/response-error';
import { TransactionService } from '@/services/transaction.service';
import { AddDOKUPaymentRes, DOKURes } from '@/utils/doku-utils/doku-model';
import { NextFunction, Request, Response } from 'express';
import { AddBokingProperty } from 'models/transaction.model';

export class TransactionController {
  async addBoking(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as AddBokingProperty;

      const doku: AddDOKUPaymentRes =
        await TransactionService.addDOKUPayment(request);

      const dateString = doku.response.payment.expired_date;

      // Extract year, month, day, hour, minute, second from the dateString
      const year = Number(dateString.substr(0, 4));
      const month = Number(dateString.substr(4, 2)) - 1; // January is 0 in JavaScript
      const day = Number(dateString.substr(6, 2));
      const hour = Number(dateString.substr(8, 2));
      const minute = Number(dateString.substr(10, 2));
      const second = Number(dateString.substr(12, 2));

      // Create a new Date object
      const dateObject = new Date(year, month, day, hour, minute, second);

      const order = await TransactionService.addBookingProperty({
        ...request,
        rooms: doku.response.order.line_items.map(
          ({ id: roomId, price, quantity }) => {
            return {
              roomId,
              price,
              quantity,
            };
          },
        ),
        expDateTime: dateObject,
        urlPayment: doku.response.payment.url,
        totalPayment: Number(doku.response.order.amount),
      });

      res.status(201).send({
        data: order,
      });
    } catch (e) {
      next(e);
    }
  }
}
