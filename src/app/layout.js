import "./globals.css";

export const metadata = {
  title: "NFOF Marketplace",
  description: "No Fear of Failure - AI Powered Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
