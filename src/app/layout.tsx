import './globals.css';
import { Inter } from 'next/font/google';
import SessionProvider from "./SessionProvider";
import AuthButton from "@/components/AuthButton";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
              <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-lg text-black font-semibold">Home</Link>
                <div className="space-x-4">
                  <Link href="/profile" className="text-blue-500 hover:text-blue-600">Profile</Link>
                  <AuthButton />
                </div>
              </nav>
            </header>
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}