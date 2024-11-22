import type { Metadata } from 'next';
import './globals.css';
import { Manrope } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme';
import ReactQueryProvider from '@/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/redux/provider';
import SsrLoader from '@/components/global/loader/ssr-loader';

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Golap',
  description:
    'Golap is a video messaging app, To share AI powered videos with your friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${manrope.className} bg-[#171717] antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>
                <SsrLoader />
                {children}
              </ReactQueryProvider>
            </ReduxProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
