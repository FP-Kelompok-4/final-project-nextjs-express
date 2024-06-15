import { auth } from "@/auth";
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from "next-auth/react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Header className="fixed top-0 z-50 border-b-[1px] bg-white" />
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
      <Footer />
    </SessionProvider>
  );
}
