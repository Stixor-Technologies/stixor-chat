import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Stixor Chatbot",
  description: "Chatbot for Stixor"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <div className="flex min-h-screen flex-col">
          <main className="flex flex-1 flex-col bg-background">{children}</main>
        </div>
      </body>
    </html>
  );
}
