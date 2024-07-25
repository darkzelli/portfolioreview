import { GeistSans } from "geist/font/sans";
import "./globals.css";
import UserProvider from "@/components/UseUser"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Portfolio Review - Make Your Portfolio Better",
  description: "Get advice and constructive criticism on your portfolio or provide feedback on others.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <UserProvider>
            {children}
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
