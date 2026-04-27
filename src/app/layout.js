import "./globals.css";
import NextAuthProvider from "@/components/providers/SessionProvider";

export const metadata = {
  title: "NFOF Marketplace",
  description: "No Fear of Failure - AI Powered Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
