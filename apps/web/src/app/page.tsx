import Hero from '@/components/Hero';
import ListTopRateProperty from '@/components/List-TopRateProperty';
import MainLayout from './(main)/layout';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  return (
    <MainLayout>
      <main className="flex flex-col gap-10 pt-[78px] mb-10 relative">
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
        <Hero />
        <ListTopRateProperty />
      </main>
    </MainLayout>
  );
}

export default Home;
