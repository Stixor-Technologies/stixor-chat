import { getServerSession } from "next-auth/next";
import ChatSection from "./components/chat-section";
import { redirect } from "next/navigation";
import Header from "./components/header";
import { authOptions } from "@/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <Header />
      <div className="relative flex h-screen overflow-hidden">
        <ChatSection />
      </div>
    </>
  );
}
