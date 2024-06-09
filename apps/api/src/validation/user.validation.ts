import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';

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

export const validatePutAccountUser = [
  param('id').trim().notEmpty().withMessage('Id is required'),

  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().notEmpty().withMessage('Email is required'),
  body('gender').trim().notEmpty().withMessage('Gender is required'),
  body('birthdate').trim().notEmpty().withMessage('Birthdate is required'),

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
