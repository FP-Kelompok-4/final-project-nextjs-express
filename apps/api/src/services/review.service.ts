import prisma from "@/prisma";
import { AddReviewReq } from "models/review.model";

export class ReviewService{
  static async addReview(req: AddReviewReq) {
    req.point = +req.point;

    const review = await prisma.review.create({
      data: req
    })

    return review;
  }
}