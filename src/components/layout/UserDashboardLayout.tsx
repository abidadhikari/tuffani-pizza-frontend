"use client";
import { ReceiptText, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IUserDashboardLayoutProps {
  children: React.ReactNode;
}

export default function UserDashboardLayout(props: IUserDashboardLayoutProps) {
  const { children } = props;
  const pathname = usePathname();

  const getTabClassName = (href: string) => {
    const isActive =
      href === "/profile"
        ? pathname === "/profile"
        : pathname?.startsWith(href);

    return isActive
      ? "text-[#0A0A0A] bg-white shadow p-2 py-1 rounded flex items-center justify-center w-fit text-sm font-semibold gap-2"
      : "text-[#0A0A0A] p-2 py-1 rounded flex items-center justify-center w-fit text-sm font-semibold gap-2 hover:bg-white";
  };

  return (
    <div className=" pt-25">
      <div className="bg-[#FFFBEB]">
        <div className="my-width mx-auto py-10 space-y-10">
          <div className="bg-[#F5F5F5] p-1 rounded w-fit flex items-center gap-1">
            <Link href="/profile" className={getTabClassName("/profile")}>
              <User2 className="size-4" /> Personal Details
            </Link>
            <Link
              href="/profile/cart"
              className={getTabClassName("/profile/cart")}
            >
              <ShoppingCart className="size-4" /> Cart
            </Link>
            <Link
              href="/profile/orders"
              className={getTabClassName("/profile/orders")}
            >
              <ReceiptText className="size-4" /> My Orders
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
