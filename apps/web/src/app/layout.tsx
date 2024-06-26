import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import ReduxProvider from '@/redux/provider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import AlertNotVerified from '@/components/Alert-Not-Verified';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable)}>
        <ReduxProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
