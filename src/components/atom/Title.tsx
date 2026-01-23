import { cn } from "@/lib/utils";
import React from "react";

interface ITitle {
  children?: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}
export default function Title(props: ITitle) {
  const { children, className, variant = "h1" } = props;
  return (
    <div
      className={cn(
        " font-extrabold",
        {
          "text-[40px]": variant === "h1",
          "text-2xl": variant === "h2",
          "text-xl": variant === "h3",
          "text-lg": variant === "h4",
          "text-base": variant === "h5",
          "text-sm": variant === "h6",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
