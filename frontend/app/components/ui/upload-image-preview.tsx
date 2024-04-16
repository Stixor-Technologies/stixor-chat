import { XCircleIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "./lib/utils";

export default function UploadImagePreview({
  url,
  onRemove
}: {
  url: string;
  onRemove: () => void;
}) {
  return (
    <div className="group relative h-20 w-20">
      <Image
        src={url}
        alt="Uploaded image"
        fill
        className="h-full w-full rounded-xl object-cover hover:brightness-75"
      />
      <div
        className={cn(
          "absolute -right-2 -top-2 z-10 hidden h-6 w-6 rounded-full bg-gray-500 text-white group-hover:block"
        )}
      >
        <XCircleIcon
          className="h-6 w-6 rounded-full bg-gray-500 text-white"
          onClick={onRemove}
        />
      </div>
    </div>
  );
}
