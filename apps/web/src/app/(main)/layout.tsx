import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="fixed top-0 z-50 border-b-[1px] bg-white" />
      {children}
      <Footer />
    </>
  );
}
