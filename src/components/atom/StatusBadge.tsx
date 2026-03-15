"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Dot from "./Dot";

export type StatusVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  hasDot?: boolean;
  isOutlined?: boolean;
  isActive?: boolean;
}

const FILLED_VARIANT_STYLES: Record<StatusVariant, string> = {
  success: "bg-green-500 text-white hover:bg-green-600",
  warning: "bg-yellow-400 text-black hover:bg-yellow-500",
  error: "bg-red-500 text-white hover:bg-red-600",
  info: "bg-blue-500 text-white hover:bg-blue-600",
  neutral: "bg-gray-500 text-white hover:bg-gray-600",
};

const OUTLINED_VARIANT_STYLES: Record<StatusVariant, string> = {
  success: "border border-green-500 text-green-600 bg-green-50",
  warning: "border border-yellow-400 text-yellow-700 bg-yellow-50",
  error: "border border-red-500 text-red-600 bg-red-50",
  info: "border border-blue-500 text-blue-600 bg-blue-50",
  neutral: "border border-gray-400 text-gray-600 bg-gray-100",
};

export default function StatusBadge({
  label,
  variant = "neutral",
  onClick,
  disabled = false,
  className,
  hasDot = false,
  isOutlined = false,
  isActive = false,
}: StatusBadgeProps) {
  const isClickable = Boolean(onClick) && !disabled;

  const variantStyle = isOutlined
    ? OUTLINED_VARIANT_STYLES[variant]
    : FILLED_VARIANT_STYLES[variant];

  return (
    <Badge
      role={isClickable ? "button" : "status"}
      tabIndex={isClickable ? 0 : -1}
      aria-disabled={disabled}
      onClick={isClickable ? onClick : undefined}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium select-none transition-all flex items-center gap-2",
        variantStyle,
        {
          "cursor-pointer": isClickable,
          "opacity-50 cursor-not-allowed": disabled,
        },
        isActive && FILLED_VARIANT_STYLES[variant],
        className,
      )}
    >
      {hasDot && <Dot size="sm" className="bg-current" />}
      {label}
    </Badge>
  );
}
