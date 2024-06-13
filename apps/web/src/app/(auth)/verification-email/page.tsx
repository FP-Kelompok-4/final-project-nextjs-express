import { auth } from "@/auth"
import VerificationWrapper from "../_components/verification-wrapper";
import { SessionProvider } from "next-auth/react";

const VerificationEmail = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <VerificationWrapper />
    </SessionProvider>
  )
}

export default VerificationEmail
