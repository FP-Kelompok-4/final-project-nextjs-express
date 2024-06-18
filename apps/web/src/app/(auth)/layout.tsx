import LinkBrand from '@/components/Link-Brand';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed z-10 w-full bg-black bg-opacity-20 md:bg-none">
        <div className="container py-4">
          <LinkBrand className="text-white" />
        </div>
      </header>
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
    </>
  );
}
