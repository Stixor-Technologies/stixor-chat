import { Loader2 } from "lucide-react";

import ChatActions from "./chat-actions";
import ChatMessage from "./chat-message";
import { ChatHandler } from "./chat.interface";

export default function ChatMessages(
  props: Pick<ChatHandler, "messages" | "isLoading" | "reload" | "stop">
) {
  const messageLength = props.messages.length;
  const lastMessage = props.messages[messageLength - 1];

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== "user";
  const showReload =
    props.reload && !props.isLoading && isLastMessageFromAssistant;
  const showStop = props.stop && props.isLoading;

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = props.isLoading && !isLastMessageFromAssistant;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background">
      <div className="flex h-full w-[90%] max-w-3xl flex-col gap-5 divide-y md:w-2/3">
        {props.messages.map((m) => (
          <ChatMessage key={m.id} {...m} />
        ))}
        {isPending && (
          <div className="flex items-center justify-center pt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      <div className="pointer-events-none fixed bottom-20 w-2/3 max-w-3xl justify-start py-4 md:bottom-28">
        <div className="flex justify-center md:justify-end md:pr-4">
          <ChatActions
            reload={props.reload}
            stop={props.stop}
            showReload={showReload}
            showStop={showStop}
          />
        </div>
      </div>
    </div>
  );
}
