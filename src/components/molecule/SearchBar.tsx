"use client";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface ISearchBar extends React.ComponentPropsWithoutRef<typeof Input> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function SearchBar(props: ISearchBar) {
  const { onValueChange, ...rest } = props;
  return (
    <div className="w-full relative ">
      <Search className="absolute text-[#202224]  top-0 left-2.5 size-5 h-full" />
      <Input
        {...rest}
        type="search"
        className={cn(
          "bg-white2  pl-10 text-[#202224] rounded-full py-2.75 lg:w-95",
          props?.className ?? "",
        )}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value);
          onValueChange?.(e.target.value);
        }}
      />
    </div>
  );
}
