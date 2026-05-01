import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NFOF - No Fear of Failure',
  description: 'Minimalist high-end fashion marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-white text-black tracking-tight font-light`}>{children}</body>
    </html>
  );
}
