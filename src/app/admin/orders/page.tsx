"use client";

import Button from "@/components/atom/Button";
import StatusBadge, { StatusVariant } from "@/components/atom/StatusBadge";
import AppPagination from "@/components/molecule/AppPagination";
import SearchBar from "@/components/molecule/SearchBar";
import { SiteHeader } from "@/components/site-header";
import { useGetAllOrdersForAdmin } from "@/hooks/services/orders/useGetAllOrdersForAdmin";
import { useUpdateOrderStatus } from "@/hooks/services/orders/useUpdateOrderStatus";
import { NormalizedOrder, OrderStatus } from "@/types/order";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const POLLING_INTERVAL_MS = 15000;

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

const getGroupKey = (order: NormalizedOrder) => order.orderGroupId || order.id;

export default function AdminOrdersPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const knownOrderIdsRef = useRef<Set<string>>(new Set());

  const { data, isLoading, refetch } = useGetAllOrdersForAdmin({
    page: pageNo,
    limit: pageSize,
    search: search || undefined,
  });

  const { mutate: updateStatus, isPending: isStatusUpdatePending } =
    useUpdateOrderStatus();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
      setPageNo(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!("Notification" in window)) {
      setNotificationPermission("unsupported");
      return;
    }

    setNotificationPermission(window.Notification.permission);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void refetch();
    }, POLLING_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [refetch]);

  const playNewOrderBeep = () => {
    if (!soundEnabled || typeof window === "undefined") {
      return;
    }

    const AudioCtx = window.AudioContext;
    if (!AudioCtx) {
      return;
    }

    const audioContext = new AudioCtx();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 920;
    gainNode.gain.value = 0.03;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.18);
  };

  useEffect(() => {
    const orders = data?.data ?? [];
    const currentIds = new Set(orders.map((order) => order.id));

    if (knownOrderIdsRef.current.size === 0) {
      knownOrderIdsRef.current = currentIds;
      return;
    }

    const newOrders = orders.filter(
      (order) => !knownOrderIdsRef.current.has(order.id),
    );

    if (newOrders.length === 0) {
      knownOrderIdsRef.current = currentIds;
      return;
    }

    const label =
      newOrders.length === 1
        ? "1 new order received"
        : `${newOrders.length} new orders received`;
    toast.success(label);

    if (
      notificationPermission === "granted" &&
      typeof window !== "undefined" &&
      document.visibilityState !== "visible"
    ) {
      new window.Notification("Tuffani new order", {
        body: label,
      });
    }

    playNewOrderBeep();
    knownOrderIdsRef.current = currentIds;
  }, [data?.data, notificationPermission, soundEnabled]);

  const requestNotificationPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      toast.error("Browser notifications are not supported here.");
      return;
    }

    const permission = await window.Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === "granted") {
      toast.success("Admin notifications enabled");
      return;
    }

    toast.error("Notification permission was not granted");
  };

  const groupedOrders = useMemo(() => {
    const groups = new Map<
      string,
      {
        key: string;
        orderGroupId?: string;
        orders: NormalizedOrder[];
        totalAmount: number;
        phones: string[];
      }
    >();

    (data?.data ?? []).forEach((order) => {
      const key = getGroupKey(order);
      const existing = groups.get(key);

      if (existing) {
        existing.orders.push(order);
        existing.totalAmount += order.totalAmount;
        if (order.userPhone && !existing.phones.includes(order.userPhone)) {
          existing.phones.push(order.userPhone);
        }
        return;
      }

      groups.set(key, {
        key,
        orderGroupId: order.orderGroupId,
        orders: [order],
        totalAmount: order.totalAmount,
        phones: order.userPhone ? [order.userPhone] : [],
      });
    });

    return Array.from(groups.values());
  }, [data?.data]);

  return (
    <div>
      <SiteHeader
        title="Orders"
        description="Track and manage all customer orders, including grouped orders, for admin and super admin users"
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/orders/stats"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          View Order Stats
        </Link>

        <SearchBar
          placeholder="Search by group, customer, or product"
          value={searchInput}
          onValueChange={setSearchInput}
          className="max-w-md"
        />

        <Button
          variant={soundEnabled ? "default" : "outline"}
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            toast.info(
              next ? "New-order sound enabled" : "New-order sound disabled",
            );
          }}
        >
          {soundEnabled ? "Sound On" : "Sound Off"}
        </Button>

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
              : "Enable Notifications"}
          </Button>
        ) : (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            Notifications enabled
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-slate-500">
          Loading orders...
        </div>
      ) : groupedOrders.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-slate-500">
          No orders found.
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
                      : `Individual order ${group.key.slice(0, 10)}`}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {group.orders.length}{" "}
                    {group.orders.length === 1 ? "order" : "orders"} grouped
                    together
                  </p>
                </div>

                <div className="text-right text-sm">
                  <p className="font-semibold text-slate-900">
                    Rs. {group.totalAmount.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">
                    Phones:{" "}
                    {group.phones.length > 0 ? group.phones.join(", ") : "N/A"}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-white text-left text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t border-slate-100 align-top"
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900">
                            {order.id.slice(0, 10)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleString()
                              : "N/A"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900">
                            {order.userName || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.userEmail || "N/A"}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {order.userPhone || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <ul className="space-y-1">
                            {order.items.length === 0 ? (
                              <li className="text-slate-500">
                                No items available.
                              </li>
                            ) : (
                              order.items.slice(0, 3).map((item) => (
                                <li
                                  key={item.id}
                                  className="flex items-center gap-2"
                                >
                                  {item.imageUrl ? (
                                    // Using img avoids next/image domain constraints for API-hosted assets.
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={item.imageUrl}
                                      alt={item.productName}
                                      className="h-9 w-9 rounded-md border border-slate-200 object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white text-[9px] text-slate-500">
                                      No Img
                                    </div>
                                  )}
                                  <span>
                                    {item.productName}
                                    {item.variantSize
                                      ? ` (${item.variantSize})`
                                      : ""}{" "}
                                    x {item.quantity}
                                  </span>
                                </li>
                              ))
                            )}
                            {order.items.length > 3 ? (
                              <li>+{order.items.length - 3} more</li>
                            ) : null}
                          </ul>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          Rs. {order.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge
                            label={order.status}
                            variant={statusToVariant[order.status]}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <select
                              value={order.status}
                              onChange={(event) => {
                                const nextStatus = event.target
                                  .value as OrderStatus;
                                if (nextStatus === order.status) return;

                                updateStatus({
                                  path: { id: order.id },
                                  body: {
                                    status: nextStatus,
                                  },
                                });
                              }}
                              disabled={isStatusUpdatePending}
                              className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs"
                            >
                              {statusOptions
                                .filter((option) => option.value !== "ALL")
                                .map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                            </select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                updateStatus({
                                  path: { id: order.id },
                                  body: {
                                    status: "CONFIRMED",
                                  },
                                });
                              }}
                              disabled={
                                isStatusUpdatePending ||
                                order.status !== "PENDING"
                              }
                            >
                              Quick Confirm
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}

      <AppPagination
        className="justify-end"
        currentPage={pageNo}
        pageSize={pageSize}
        totalItems={data?.meta.total ?? 0}
        onPageChange={setPageNo}
        onPageSizeChange={setPageSize}
        showPageInfo
        showPageSizeSelector
      />
    </div>
  );
}
