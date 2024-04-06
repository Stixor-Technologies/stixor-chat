import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Stixor Chatbot",
  description: "Chatbot for Stixor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex flex-col flex-1 bg-secondary-foreground">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
