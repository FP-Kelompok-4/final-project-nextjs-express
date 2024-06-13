import { auth } from '@/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';

const TenantDashboard = () => {
  const { data: session, update } = useSession();

  return (
    <main className="min-h-svh pt-[78px]">
      {session?.user.isVerified === false && (
        <div className="fixed right-1/2 top-24 z-20 max-md:w-[300px] max-md:translate-x-1/2 md:right-6">
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
  );
};

export default TenantDashboard;
