import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface IMyIcon {
  icon: string;
  className?: string;
}

export default function MyIcon({ icon, className }: IMyIcon) {
  return <Icon icon={icon} className={cn("cursor-pointer", className)} />;
}
