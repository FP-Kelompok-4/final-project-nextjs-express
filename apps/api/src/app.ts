import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import path from 'path';
import cors from 'cors';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { ResponseError } from './error/response-error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserRouter } from './routers/user.router';
import { VerificationTokenRouter } from './routers/verificationToken.route';
import { PropertyRouter } from './routers/property.router';
import { PropertyCategoryRouter } from './routers/propertyCategory.router';
import { RoomRouter } from './routers/room.router';
import { RoomAvailabilityRouter } from './routers/roomAvailability.router';
import { TransactionRouter } from './routers/transaction.router';
import { SpecialPriceRouter } from './routers/specialPrice.router';
import { OrderRouter } from './routers/order.router';
import cron from 'node-cron';
import {
  reminderRuleUtil,
  updateExpiredBookingPayment,
} from './utils/schedules-utils';
import { ReviewRouter } from "./routers/review.router";

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private handleError(): void {
    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ResponseError) {
          res.status(err.status).send({
            status: 'fail',
            message: err.message,
          });
        } else if (err instanceof PrismaClientKnownRequestError) {
          res.status(400).send({
            status: 'fail',
            message: err.message,
          });
        } else {
          res.status(500).send({
            status: 'fail',
            message: err.message,
          });
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const userRouter = new UserRouter();
    const verificationToken = new VerificationTokenRouter();
    const propertyRouter = new PropertyRouter();
    const roomRouter = new RoomRouter();
    const propertyCategoryRouter = new PropertyCategoryRouter();
    const roomAvailabilityRouter = new RoomAvailabilityRouter();
    const transactionRouter = new TransactionRouter();
    const specialPriceRouter = new SpecialPriceRouter();
    const orderRouter = new OrderRouter();
    const reviewRouter = new ReviewRouter();

    this.app.get('/api/', (req: Request, res: Response) => {
      res.send(`Restful API is already !`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/verification-token', verificationToken.getRouter());
    this.app.use('/api/properties', propertyRouter.getRouter());
    this.app.use('/api/rooms', roomRouter.getRouter());
    this.app.use('/api/property-category', propertyCategoryRouter.getRouter());
    this.app.use('/api/room-availability', roomAvailabilityRouter.getRouter());
    this.app.use('/api/transaction', transactionRouter.getRouter());
    this.app.use('/api/special-price', specialPriceRouter.getRouter());
    this.app.use('/api/order', orderRouter.getRouter());
    this.app.use('/api/review', reviewRouter.getRouter());
  }

  private schedule(): void {
    cron.schedule('0 0 0 */1 * *', () => {
      console.log('--------------------Run 1 second');

      reminderRuleUtil();
    });

    cron.schedule('0 */1 * * * *', () => {
      updateExpiredBookingPayment();
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });

    this.schedule();
  }
}
