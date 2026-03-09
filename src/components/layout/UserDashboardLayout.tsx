"use client";
import { User2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IUserDashboardLayoutProps {
  children: React.ReactNode;
}

export default function UserDashboardLayout(props: IUserDashboardLayoutProps) {
  const { children } = props;
  return (
    <div className=" pt-25">
      <div className="bg-[#FFFBEB]">
        <div className="my-width mx-auto py-10 space-y-10">
          <div className="bg-[#F5F5F5] p-1 rounded w-fit">
            <Link
              href="/profile"
              className="text-[#0A0A0A] bg-white shadow p-2 py-1 rounded flex items-center justify-center w-fit text-sm font-semibold gap-2"
            >
              <User2 className="size-4" /> Personal Details
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
