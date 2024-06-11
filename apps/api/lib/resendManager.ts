import { RESEND_API_KEY } from "@/config"
import { Resend } from "resend"

const resend = new Resend(RESEND_API_KEY)

export const ResendManager = {
  sendEmail: async (email: string, token: string) => {
    return await resend.emails.send({
      from: "StayCation <onboarding@resend.dev>",
      to: email,
      subject: "Verification Email",
      html: `
        <p>Click the link below to verify your email:</p>
        <a href="http://localhost:3000/verification-email?token=${token}">Click here</a>
      `
    })
  } 
}
