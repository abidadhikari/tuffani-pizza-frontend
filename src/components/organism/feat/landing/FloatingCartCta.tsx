"use client";

import Button from "@/components/atom/Button";
import { useCart } from "@/hooks/services/cart/useCart";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function FloatingCartCta() {
  const { totalItems } = useCart();

  if (totalItems <= 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6">
      <Button
        asChild
        className="pointer-events-auto h-auto min-w-55 rounded-full px-5 py-3 shadow-lg shadow-brand/20"
      >
        <Link
          href="/profile/cart"
          aria-label={`Review cart and order, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
        >
          <ShoppingCart className="size-5" />
          <span>Order Now</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        </Link>
      </Button>
    </div>
  );
}
