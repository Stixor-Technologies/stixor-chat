import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Header from "./components/header";

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
          <Header />
          <main className="flex flex-col flex-1 bg-background">{children}</main>
        </div>
      </body>
    </html>
  );
}
