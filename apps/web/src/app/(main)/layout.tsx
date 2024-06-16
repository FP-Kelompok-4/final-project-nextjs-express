import { auth } from "@/auth";
import AlertNotVerified from '@/components/Alert-Not-Verified';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <Header className="fixed top-0 z-50 border-b-[1px] bg-white" />
      <AlertNotVerified isVerified={session?.user.isVerified} />
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
      <Footer />
    </>
  );
}
