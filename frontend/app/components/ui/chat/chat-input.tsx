import { useState } from "react";
import { Button } from "../button";
import FileUploader from "../file-uploader";
import { Input } from "../input";
import UploadImagePreview from "../upload-image-preview";
import { ChatHandler } from "./chat.interface";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { ButtonScrollToBottom } from "../../button-scroll-to-bottom";

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleInputChange"
    | "messages"
    | "append"
  > & {
    multiModal?: boolean;
    isAtBottom: boolean;
    scrollToBottom: () => void;
  }
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (imageUrl) {
      props.handleSubmit(e, {
        data: { imageUrl: imageUrl }
      });
      setImageUrl(null);
      return;
    }
    props.handleSubmit(e);
  };

  const onRemovePreviewImage = () => setImageUrl(null);

  const handleUploadImageFile = async (file: File) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
    setImageUrl(base64);
  };

  const handleUploadFile = async (file: File) => {
    try {
      if (props.multiModal && file.type.startsWith("image/")) {
        return await handleUploadImageFile(file);
      }
      props.onFileUpload?.(file);
    } catch (error: any) {
      props.onFileError?.(error.message);
    }
  };

  const exampleMessages = [
    {
      heading: "What are the",
      subheading: "Bonus policies at Stixor?",
      message: `What are the bonus policies at Stixor?`
    },
    {
      heading: "What was the",
      subheading: "CSD project about?",
      message: "What was the CSD project about?"
    },
    {
      heading: "What are the",
      subheading: "development tools we use at Stixor?",
      message: `What are the development tools we use at Stixor?`
    },
    {
      heading: "What is the",
      subheading: `testing and quality process at Stixor?`,
      message: `What is the testing and quality process at Stixor?`
    }
  ];

  return (
    <div className="fixed bottom-0 h-0 w-screen max-w-3xl bg-white">
      <ButtonScrollToBottom
        isAtBottom={props.isAtBottom}
        scrollToBottom={props.scrollToBottom}
      />

      <div className="fixed flex w-full justify-center">
        <div className="fixed bottom-20 flex w-screen justify-center md:bottom-28">
          <div className="mb-4 grid w-full max-w-3xl grid-cols-2 gap-2 px-4 md:w-2/3">
            {props.messages.length === 0 &&
              exampleMessages.map((example, index) => (
                <div
                  key={example.heading}
                  className={`cursor-pointer rounded-lg border bg-white p-4 transition-all duration-300 ease-in-out hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                    index > 1 && "hidden md:block"
                  }`}
                  onClick={() => {
                    props.append({ content: example.message, role: "user" });
                  }}
                >
                  <div className="text-base font-semibold">
                    {example.heading}
                  </div>
                  <div className="text-base text-zinc-600">
                    {example.subheading}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="fixed bottom-2 left-1/2 w-[95vw] max-w-3xl -translate-x-1/2 space-y-4 rounded-full bg-white p-4 shadow-xl md:bottom-10 
        md:w-2/3"
      >
        {imageUrl && (
          <UploadImagePreview url={imageUrl} onRemove={onRemovePreviewImage} />
        )}
        <div className="flex w-full items-start justify-between gap-4 ">
          <Input
            autoFocus
            name="message"
            placeholder="Type a message"
            className="flex-1"
            value={props.input}
            onChange={props.handleInputChange}
          />
          {/* <FileUploader
          onFileUpload={handleUploadFile}
          onFileError={props.onFileError}
        /> */}
          <Button type="submit" size="icon" disabled={props.isLoading}>
            <ArrowTopRightIcon />
          </Button>
        </div>
      </form>
    </div>
  );
}
