"use client";

import Button from "@/components/atom/Button";
import StatusBadge, { StatusVariant } from "@/components/atom/StatusBadge";
import UserDashboardLayout from "@/components/layout/UserDashboardLayout";
import AppPagination from "@/components/molecule/AppPagination";
import { Input } from "@/components/ui/input";
import { useCancelMyOrder } from "@/hooks/services/orders/useCancelMyOrder";
import { useGetMyOrders } from "@/hooks/services/orders/useGetMyOrders";
import { NormalizedOrder, OrderStatus } from "@/types/order";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const POLLING_INTERVAL_MS = 20000;

const getInitialNotificationPermission = ():
  | NotificationPermission
  | "unsupported" => {
  if (typeof window === "undefined") {
    return "default";
  }

  if (!("Notification" in window)) {
    return "unsupported";
  }

  return window.Notification.permission;
};

const statusOptions: Array<{ label: string; value: OrderStatus | "ALL" }> = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const statusToVariant: Record<OrderStatus, StatusVariant> = {
  PENDING: "warning",
  CONFIRMED: "info",
  DELIVERED: "success",
  CANCELLED: "error",
};

const getOrderGroupKey = (order: NormalizedOrder) =>
  order.orderGroupId || order.id;

const getOrderGroupLabel = (groupId: string, ordersCount: number) => {
  if (ordersCount === 1 && !groupId.startsWith("group:")) {
    return "Single Order";
  }

  return groupId;
};

export default function OrdersPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >(getInitialNotificationPermission);
  const previousStatusesRef = useRef<Record<string, OrderStatus>>({});
  const hasHydratedStatusesRef = useRef(false);

  const { data, isLoading, refetch } = useGetMyOrders({
    page: pageNo,
    limit: pageSize,
    status: status === "ALL" ? undefined : status,
    search: search || undefined,
  });

  const { mutate: cancelOrder, isPending: isCancelPending } =
    useCancelMyOrder();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
      setPageNo(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void refetch();
    }, POLLING_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [refetch]);

  useEffect(() => {
    const orders = data?.data ?? [];
    const nextStatuses = Object.fromEntries(
      orders.map((order) => [order.id, order.status]),
    ) as Record<string, OrderStatus>;

    if (!hasHydratedStatusesRef.current) {
      previousStatusesRef.current = nextStatuses;
      hasHydratedStatusesRef.current = true;
      return;
    }

    orders.forEach((order) => {
      const previousStatus = previousStatusesRef.current[order.id];

      if (!previousStatus || previousStatus === order.status) {
        return;
      }

      const message = `Order ${order.id.slice(0, 8)} is now ${order.status.toLowerCase()}`;
      toast.info(message);

      if (
        notificationPermission === "granted" &&
        typeof window !== "undefined" &&
        document.visibilityState !== "visible"
      ) {
        new window.Notification("Tuffani order update", {
          body: message,
        });
      }
    });

    previousStatusesRef.current = nextStatuses;
  }, [data?.data, notificationPermission]);

  const emptyMessage = useMemo(() => {
    if (isLoading) return "Loading your orders...";
    if ((data?.data.length ?? 0) > 0) return "";
    if (search || status !== "ALL") return "No orders match your filters.";
    return "You have not placed any order yet.";
  }, [data?.data.length, isLoading, search, status]);

  const groupedOrders = useMemo(() => {
    const groups = new Map<
      string,
      {
        key: string;
        orderGroupId?: string;
        orders: NormalizedOrder[];
        totalAmount: number;
      }
    >();

    (data?.data ?? []).forEach((order) => {
      const key = getOrderGroupKey(order);
      const existing = groups.get(key);

      if (existing) {
        existing.orders.push(order);
        existing.totalAmount += order.totalAmount;
        return;
      }

      groups.set(key, {
        key,
        orderGroupId: order.orderGroupId,
        orders: [order],
        totalAmount: order.totalAmount,
      });
    });

    return Array.from(groups.values());
  }, [data?.data]);

  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      toast.error("Browser notifications are not supported here.");
      return;
    }

    const permission = await window.Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === "granted") {
      toast.success("Browser notifications enabled for order updates");
      return;
    }

    toast.error("Notification permission was not granted");
  };

  return (
    <UserDashboardLayout>
      <section className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Track My Orders
            </h1>
            <p className="text-sm text-slate-600">
              Check live order status, grouped orders, and cancel pending
              orders. This page refreshes every 20 seconds.
            </p>
          </div>

          {notificationPermission !== "granted" ? (
            <Button
              variant="outline"
              onClick={() => {
                void requestNotificationPermission();
              }}
              disabled={notificationPermission === "unsupported"}
            >
              {notificationPermission === "unsupported"
                ? "Notifications Unavailable"
                : "Enable Browser Notifications"}
            </Button>
          ) : (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Browser notifications enabled
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 hidden">
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by order group or product"
            className="max-w-sm bg-white"
          />

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as OrderStatus | "ALL");
              setPageNo(1);
            }}
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {emptyMessage ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-4">
            {groupedOrders.map((group) => (
              <section
                key={group.key}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {group.orderGroupId
                        ? `Group ${group.orderGroupId}`
                        : getOrderGroupLabel(group.key, group.orders.length)}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {group.orders.length}{" "}
                      {group.orders.length === 1 ? "order" : "orders"} in this
                      section
                    </p>
                  </div>

                  <div className="text-right text-sm">
                    <p className="font-semibold text-slate-900">
                      Rs. {group.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">Combined total</p>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  {group.orders.map((order) => (
                    <article
                      key={order.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-900">
                              Order {order.id.slice(0, 8)}
                            </h3>
                            <StatusBadge
                              label={order.status}
                              variant={statusToVariant[order.status]}
                            />
                          </div>
                          <p className="text-xs text-slate-500">
                            Created:{" "}
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900">
                            Rs. {order.totalAmount.toFixed(2)}
                          </p>
                          {order.status === "PENDING" && (
                            <Button
                              variant="outline"
                              className="mt-2"
                              disabled={isCancelPending}
                              onClick={() => cancelOrder({ id: order.id })}
                            >
                              Cancel Order
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 grid gap-2 rounded-lg bg-slate-50 p-3 text-sm">
                        {order.items.length === 0 ? (
                          <p className="text-slate-500">
                            No items available for this order.
                          </p>
                        ) : (
                          order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                {item.imageUrl ? (
                                  // Keep image rendering resilient for mixed absolute/relative API URLs.
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="h-10 w-10 rounded-md border border-slate-200 object-cover"
                                  />
                                ) : (
                                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white text-[10px] text-slate-500">
                                    No Img
                                  </div>
                                )}

                                <p className="text-slate-700">
                                  {item.productName}
                                  {item.variantSize
                                    ? ` (${item.variantSize})`
                                    : ""}{" "}
                                  x {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium text-slate-900">
                                Rs. {item.totalPrice.toFixed(2)}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <AppPagination
          currentPage={pageNo}
          pageSize={pageSize}
          totalItems={data?.meta.total ?? 0}
          onPageChange={setPageNo}
          onPageSizeChange={setPageSize}
          showPageInfo
          showPageSizeSelector
        />
      </section>
    </UserDashboardLayout>
  );
}
