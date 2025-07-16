'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/shared/CartSidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CartSidebar />
          </div>
        </Provider>
      </body>
    </html>
  );
}