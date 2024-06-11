import { UserService } from "@/services/user.service";
import { VerificationTokenService } from "@/services/verificationToken.service";
import { NextFunction, Request, Response } from "express";
import { ResendManager } from "lib/resendManager";

export class VerificationTokenController {
  async postVerificationTokenByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body as { email: string };

      await UserService.verifyUserByEmail({ email });

      const verificationToken = await VerificationTokenService.addVerificationToken({ email });

      const { data, error } = await ResendManager.sendEmail(email, verificationToken.token);

      if (error) res.status(400).send({ status: "fail", message: error.message });

      res.status(201).send({
        data: verificationToken,
        resend: data
      })
    } catch (e) {
      next(e)
    }
  }
}
