import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateSample = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('code').trim().notEmpty().withMessage('Code is required').isNumeric().withMessage('Code contains only number characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: 'fail',
        message: errors.array()
      })
    }

    next();
  }
]
