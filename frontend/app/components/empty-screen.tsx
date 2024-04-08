export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8 bg-white">
        <h1 className="text-lg font-semibold">
          Welcome to the Stixor AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is an AI chatbot app built with Next.js Fast API, and LlamaIndex
        </p>
        <p className="leading-normal text-muted-foreground">
          This chatbot is meant to help you navigate your way at Stixor
          Technologies. You can ask it questions about HR policies, development
          processes, design guides and more!
        </p>
      </div>
    </div>
  );
}
