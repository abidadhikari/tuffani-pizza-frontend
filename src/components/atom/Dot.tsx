import { cn } from "@/lib/utils";

interface IDot {
  className?: string;
  inline?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function Dot(props: IDot) {
  const { className = "bg-primary", inline = false, size = "sm" } = props;
  return (
    <span
      className={cn(
        `w-2 h-2 rounded-full  ${inline ? "inline-block" : "block"}`,
        className,
        {
          "size-1": size === "xs",
          "size-2": size === "sm",
          "size-3": size === "md",
          "size-4": size === "lg",
        },
      )}
    ></span>
  );
}
