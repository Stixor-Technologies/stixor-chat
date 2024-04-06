import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <div className="relative flex h-screen overflow-hidden">
      <ChatSection />
    </div>
  );
}
