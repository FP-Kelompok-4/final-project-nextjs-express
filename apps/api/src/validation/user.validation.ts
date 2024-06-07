import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validatePostUser = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().notEmpty().withMessage('Email is required'),
  body('password').if((value) => value).trim().isLength({ min: 6 }).withMessage('Min length password is 6 character'),
  body('role').trim().notEmpty().withMessage('Role is required'),

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

export const validateGetUser = [
  body('email').trim().isEmail().notEmpty().withMessage('Email is required'),
  body('password').if((value) => value).trim().isLength({ min: 1 }).withMessage('Password is required'),

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
