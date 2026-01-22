import React from "react";
interface WavyTextProps {
  children?: React.ReactNode;
  className?: string;
}

export default function WavyText({ children, className }: WavyTextProps) {
  return (
    <div className={`font-trade-winds text-brand ${className}`}>{children}</div>
  );
}
