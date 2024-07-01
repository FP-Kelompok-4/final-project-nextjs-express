import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';


export const validateAddBooking = [
    body('userId').trim().notEmpty().withMessage('User Id is required'),
    body('pId').trim().notEmpty().withMessage('Property Id is required'),

    body('checkIn').trim().notEmpty().withMessage('Check In is required'),
    body('checkOut').trim().notEmpty().withMessage('Check Out is required'),

    body('rooms').notEmpty().withMessage('Rooms is required'),
  

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).send({
          status: 'fail',
          message: errors.array(),
        });
      }
  
      next();
    },
  ];