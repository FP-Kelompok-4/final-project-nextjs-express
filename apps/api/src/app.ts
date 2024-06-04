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
            message: err.message
          });
        } else if (err instanceof PrismaClientKnownRequestError) {
          res.status(400).send({
            status: 'fail',
            message: err.message
          });
        } else {
          res.status(500).send({
            status: 'fail',
            message: err.message
          });
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const userRouter = new UserRouter();

    this.app.get('/api/', (req: Request, res: Response) => {
      res.send(`Restful API is already !`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/users', userRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
