"use client";

import { useChat } from "ai/react";
import { RefObject, useMemo } from "react";
import { insertDataIntoMessages } from "./transform";
import { ChatInput, ChatMessages } from "./ui/chat";
import { useScrollAnchor } from "../hooks/use-scroll-anchor";

export default function ChatSection() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    data,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
  });

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div
      className="w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div className="pb-40 pt-16 md:pt-20" ref={messagesRef}>
        <ChatMessages
          messages={transformedMessages}
          isLoading={isLoading}
          reload={reload}
          stop={stop}
        />
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
