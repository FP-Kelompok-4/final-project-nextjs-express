import { GOOGLE_PASSWORD, GOOGLE_USER } from "@/config";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GOOGLE_USER,
    pass: GOOGLE_PASSWORD,
  }
})

export const templateNodemailer = async (email: string, token: string) => {
  await transporter.sendMail({
    from: `"StayCation" <${GOOGLE_USER}>`,
    to: email,
    subject: "Verify Email",
    html: `
      <p>Click the link below to verify your email:</p>
      <a href="http://localhost:3000/verification-email?token=${token}">Click here</a>
    `
  })
}
