import { auth } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React from 'react'

const TenantDashboard = async () => {
  const session = await auth();

  return (
    <main className="min-h-svh pt-[78px]">
      {session?.user.isVerified === false && (
        <div className="max-md:w-[300px] fixed top-24 md:right-6 right-1/2 max-md:translate-x-1/2 z-20">
          <Alert className="bg-white" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              Please check your email to verify your email.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div>TenantDashboard</div>
    </main>
  )
}

export default TenantDashboard
  