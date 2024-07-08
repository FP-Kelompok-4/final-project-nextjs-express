import { ReviewService } from "@/services/review.service";
import { NextFunction, Request, Response } from "express";
import { AddReviewReq } from "models/review.model";

export class ReviewController{
  async postReview(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as AddReviewReq;

      const review = await ReviewService.addReview(request);

      res.status(201).send({
        data: review
      })
    } catch (e) {
      next(e)
    }
  }
}