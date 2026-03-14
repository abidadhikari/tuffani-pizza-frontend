"use client";

import Button from "@/components/atom/Button";
import { SiteHeader } from "@/components/site-header";
import { useDownloadSalesReportExcel } from "@/hooks/services/orders/useDownloadSalesReportExcel";
import { useGetOrderStats } from "@/hooks/services/orders/useGetOrderStats";
import { OrderStatus } from "@/types/order";
import Link from "next/link";
import { useMemo, useState } from "react";

const statusOptions: Array<{ label: string; value: OrderStatus | "ALL" }> = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const formatDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toIsoStartOfDay = (dateInput: string) =>
  dateInput ? new Date(`${dateInput}T00:00:00`).toISOString() : undefined;

const toIsoEndOfDay = (dateInput: string) =>
  dateInput ? new Date(`${dateInput}T23:59:59.999`).toISOString() : undefined;

export default function AdminOrderStatsPage() {
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [maxRows, setMaxRows] = useState("5000");
  const [fromDate, setFromDate] = useState(() =>
    formatDateInputValue(
      new Date(new Date().setDate(new Date().getDate() - 7)),
    ),
  );
  const [toDate, setToDate] = useState(() => formatDateInputValue(new Date()));

  const queryPayload = useMemo(
    () => ({
      fromDate: toIsoStartOfDay(fromDate),
      toDate: toIsoEndOfDay(toDate),
      status: status === "ALL" ? undefined : status,
      search: search.trim() || undefined,
      userId: userId.trim() || undefined,
      maxRows:
        maxRows.trim().length > 0 && Number.isFinite(Number(maxRows))
          ? Number(maxRows)
          : undefined,
    }),
    [fromDate, maxRows, search, status, toDate, userId],
  );

  const { data, isLoading, isFetching, refetch } =
    useGetOrderStats(queryPayload);
  const { mutate: downloadExcel, isPending: isDownloading } =
    useDownloadSalesReportExcel();

  const resolvedDeliveredRevenue = useMemo(() => {
    if (!data) return 0;

    if (data.deliveredRevenue > 0) {
      return data.deliveredRevenue;
    }

    // If API doesn't return deliveredRevenue explicitly, DELIVERED filter means all revenue is realized.
    if (status === "DELIVERED") {
      return data.grossRevenue;
    }

    return 0;
  }, [data, status]);

  return (
    <div className="pb-5">
      <SiteHeader
        title="Order Stats"
        description="Filter order analytics and generate downloadable sales reports"
      />

      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <div>
            <label className="mb-1 block text-xs text-slate-600">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Status</label>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as OrderStatus | "ALL")
              }
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Search</label>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Group, product, user"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="Optional"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">
              Max Rows
            </label>
            <input
              type="number"
              min={1}
              value={maxRows}
              onChange={(event) => setMaxRows(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Gross Sales includes all matched orders. Realized Revenue includes
          delivered orders only.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              void refetch();
            }}
            disabled={isFetching}
          >
            Refresh Stats
          </Button>

          <Button
            onClick={() => downloadExcel(queryPayload)}
            disabled={isDownloading}
            isLoading={isDownloading}
          >
            Download Sales Excel
          </Button>

          <Link
            href="/admin/orders"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to Orders
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
          Loading order stats...
        </div>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-9">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Orders</p>
              <p className="text-lg font-semibold text-slate-900">
                {data?.totalOrders ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Groups</p>
              <p className="text-lg font-semibold text-slate-900">
                {data?.totalGroups ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Items</p>
              <p className="text-lg font-semibold text-slate-900">
                {data?.totalItems ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Gross Sales</p>
              <p className="text-lg font-semibold text-slate-900">
                Rs. {(data?.grossRevenue ?? data?.totalRevenue ?? 0).toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Realized Revenue</p>
              <p className="text-lg font-semibold text-emerald-700">
                Rs. {resolvedDeliveredRevenue.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Avg Order</p>
              <p className="text-lg font-semibold text-slate-900">
                Rs. {(data?.averageOrderValue ?? 0).toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Pending</p>
              <p className="text-lg font-semibold text-amber-600">
                {data?.pending ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Confirmed</p>
              <p className="text-lg font-semibold text-sky-600">
                {data?.confirmed ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Delivered</p>
              <p className="text-lg font-semibold text-emerald-600">
                {data?.delivered ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Cancelled</p>
              <p className="text-lg font-semibold text-rose-600">
                {data?.cancelled ?? 0}
              </p>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">
                Daily Stats
              </h2>
              {(data?.byDay.length ?? 0) === 0 ? (
                <p className="text-sm text-slate-500">
                  No daily data available.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-slate-500">
                      <tr>
                        <th className="pb-2">Date</th>
                        <th className="pb-2">Orders</th>
                        <th className="pb-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.byDay.map((point) => (
                        <tr
                          key={point.date}
                          className="border-t border-slate-100"
                        >
                          <td className="py-2 pr-3">{point.date}</td>
                          <td className="py-2 pr-3">{point.orders}</td>
                          <td className="py-2">
                            Rs. {point.revenue.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">
                Top Products
              </h2>
              {(data?.topProducts.length ?? 0) === 0 ? (
                <p className="text-sm text-slate-500">
                  No product summary available.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-slate-500">
                      <tr>
                        <th className="pb-2">Product</th>
                        <th className="pb-2">Qty</th>
                        <th className="pb-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.topProducts.map((product, index) => (
                        <tr
                          key={`${product.productId || product.productName}-${index}`}
                          className="border-t border-slate-100"
                        >
                          <td className="py-2 pr-3">{product.productName}</td>
                          <td className="py-2 pr-3">{product.quantity}</td>
                          <td className="py-2">
                            Rs. {product.revenue.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
