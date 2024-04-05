import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-[#F8F8F8] min-h-screen">
      {/* <Header /> */}
      <ChatSection />
    </main>
  );
}
