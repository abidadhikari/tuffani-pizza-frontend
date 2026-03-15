import { Image as ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  className?: string;
}

export default function ImagePlaceholder(props: ImagePlaceholderProps) {
  return (
    <div
      className={`h-full grid place-items-center bg-gray-200 ${props.className || ""}`}
    >
      <ImageIcon className="size-12 text-gray-400" />
    </div>
  );
}
