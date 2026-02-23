"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SiteHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function SiteHeader({ title, children }: SiteHeaderProps) {
  const navigate = useRouter();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)  mb-4 py-8">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <button
          onClick={() => navigate.back()}
          className="text-sm font-medium underline underline-offset-4 hover:bg-gray-100 p-1.25 rounded-md flex items-center gap-1  cursor-pointer"
        >
          <ChevronLeft className=" h-4 w-4" />
        </button>
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        {children && <div className="ml-auto">{children}</div>}
      </div>
    </header>
  );
}
