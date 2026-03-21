"use client";

import Button from "@/components/atom/Button";
import UserDashboardLayout from "@/components/layout/UserDashboardLayout";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/services/cart/useCart";
import { useCreateOrder } from "@/hooks/services/orders/useCreateOrder";
import PhoneConfirmModal from "@/components/organism/feat/cart/PhoneConfirmModal";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalAmount,
    totalItems,
  } = useCart();

  const { mutate: createOrder, isPending } = useCreateOrder(() => {
    clearCart();
    router.push("/profile/orders");
  });

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [phoneModalKey, setPhoneModalKey] = useState(0);

  const sizeLabelMap = {
    SMALL: "Small",
    MEDIUM: "Medium",
    LARGE: "Large",
  } as const;

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setPhoneModalKey((k) => k + 1);
    setIsPhoneModalOpen(true);
  };

  const handleConfirmedOrder = () => {
    createOrder({
      body: {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          variantSize: item.variantSize,
          addonIds: item.addonIds,
        })),
      },
    });
  };

  return (
    <UserDashboardLayout>
      <PhoneConfirmModal
        key={phoneModalKey}
        open={isPhoneModalOpen}
        onOpenChange={setIsPhoneModalOpen}
        onConfirmed={handleConfirmedOrder}
      />
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Your Cart</h1>
            <p className="text-sm text-slate-600">
              Simple checkout: review items and place your order.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/profile/orders"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Track Orders
            </Link>
            <Button
              variant="outline"
              onClick={clearCart}
              disabled={items.length === 0}
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Add items from the menu to start ordering.
            </p>
            <Link href="/menu" className="mt-4 inline-block">
              <Button>Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {items.map((item) => (
                <article
                  key={`${item.productId}-${item.variantSize ?? "DEFAULT"}-${[...(item.addonIds ?? [])].sort().join(",")}`}
                  className="border-b border-slate-100 p-4 last:border-b-0"
                >
                  <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      {item.variantSize ? (
                        <p className="text-xs text-slate-600">
                          Size: {sizeLabelMap[item.variantSize]}
                        </p>
                      ) : null}
                      <p className="text-xs text-slate-600">
                        Rs. {item.price.toFixed(2)} each
                      </p>
                      {item.selectedAddons && item.selectedAddons.length > 0 ? (
                        <p className="text-xs text-slate-600">
                          Add-ons:{" "}
                          {item.selectedAddons
                            .map(
                              (addon) =>
                                `${addon.name} (Rs. ${addon.price.toFixed(2)})`,
                            )
                            .join(", ")}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.variantSize,
                            item.addonIds,
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        className="h-9 w-14 text-center"
                        value={item.quantity}
                        min={1}
                        type="number"
                        onChange={(event) => {
                          const quantity = Number(event.target.value);
                          updateQuantity(
                            item.productId,
                            Number.isFinite(quantity) ? quantity : 1,
                            item.variantSize,
                            item.addonIds,
                          );
                        }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.variantSize,
                            item.addonIds,
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <p className="min-w-20 text-right text-sm font-semibold text-slate-900">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          removeItem(
                            item.productId,
                            item.variantSize,
                            item.addonIds,
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-base font-semibold text-slate-900">
                Order Summary
              </h2>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Total items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {totalAmount.toFixed(2)}</span>
                </div>
                {/* <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div> */}
              </div>

              <Button
                className="mt-4 w-full"
                onClick={handlePlaceOrder}
                isLoading={isPending}
                disabled={isPending || items.length === 0}
              >
                {isPending ? "Placing Order…" : "Place Order"}
              </Button>

              <p className="mt-2 text-xs text-slate-500">
                Cart is saved only for your account on this browser.
              </p>
            </aside>
          </div>
        )}
      </section>
    </UserDashboardLayout>
  );
}
