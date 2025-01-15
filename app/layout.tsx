'use client';

import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import TopBar from "@/components/TopBar";

const geist = Geist({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
          <ProtectedRoute>
            <TopBar />
            <main>{children}</main>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
