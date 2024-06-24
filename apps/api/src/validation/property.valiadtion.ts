import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

export const validatAddProperty = [
  body('email').trim().isEmail().notEmpty().withMessage('Email is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('propertyCategoryId').trim().notEmpty().withMessage('PropertyCategoryId is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),

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
