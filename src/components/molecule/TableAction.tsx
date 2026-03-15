import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Button from "../atom/Button";

const TableActionHeader = () => {
  return (
    <div className=" w-full flex items-center justify-end px-5">Action</div>
  );
};

type TableActionColProps = {
  children?: React.ReactNode;
  className?: string;
  navigateTo?: string;
  onViewClick?: () => void;
};

const TableActionCol = ({
  children,
  className,
  navigateTo,
  onViewClick,
}: TableActionColProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-end px-5 gap-2   ",
        className,
      )}
    >
      {children}
      {onViewClick && (
        <Button variant="outline" size="sm" onClick={onViewClick}>
          View
        </Button>
      )}
      {navigateTo && (
        <Link className="w-fit" href={navigateTo ?? "#"}>
          <ChevronRight className="size-5" />
        </Link>
      )}
    </div>
  );
};

export { TableActionHeader, TableActionCol };
