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

interface AppSelectProps {
  data: SelectData;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  className?: string;
}

export default function AppSelect({
  data,
  placeholder = "Select option",
  value,
  onChange,
  label,
  className,
}: AppSelectProps) {
  const isGrouped = data?.length && "options" in data[0];

  return (
    <div className="flex flex-row gap-2 items-center ">
      {label && <div className=" text-sm font-medium">{label}</div>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn("w-fit", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent position="popper">
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
