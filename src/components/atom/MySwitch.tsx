"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface MySwitchProps extends React.ComponentPropsWithoutRef<typeof Switch> {
  label?: string;
  description?: string;
}

export const MySwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  MySwitchProps
>(({ className, label, description, ...props }, ref) => {
  return (
    <div className="flex items-center justify-between gap-3">
      {(label || description) && (
        <div className="space-y-1">
          {label && <p className="text-sm font-medium leading-none">{label}</p>}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <Switch
        ref={ref}
        className={cn(className, "cursor-pointer")}
        {...props}
      />
    </div>
  );
});

MySwitch.displayName = "MySwitch";
