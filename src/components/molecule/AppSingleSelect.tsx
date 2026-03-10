"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  value: string;
}

interface GroupedOption {
  label: string;
  options: Option[];
}

type SelectData = Option[] | GroupedOption[];

interface AppSingleSelectProps {
  data: SelectData;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  className?: string;
  selectContentClassName?: string;
}

export default function AppSingleSelect({
  data,
  placeholder = "Select option",
  value,
  onChange,
  label,
  className,
  selectContentClassName,
}: AppSingleSelectProps) {
  const isGrouped = data?.length && "options" in data[0];

  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {label && (
        <div className=" text-sm font-medium whitespace-nowrap  h-full">
          {label}
        </div>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("min-w-10! w-full! max-w-40!", className)}>
          <SelectValue
            placeholder={placeholder}
            className="min-w-10 w-full max-w-40!"
          />
        </SelectTrigger>

        <SelectContent
          position="popper"
          className={cn("min-w-0", selectContentClassName)}
        >
          {isGrouped
            ? (data as GroupedOption[]).map((group) => (
                <SelectGroup key={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))
            : (data as Option[]).map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </div>
  );
}
