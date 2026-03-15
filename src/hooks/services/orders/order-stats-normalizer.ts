import {
  OrderStatsDailyPoint,
  OrderStatsResponse,
  OrderStatsTopProduct,
} from "@/types/order";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (
  obj: Record<string, unknown>,
  key: string,
): string | undefined => {
  const value = obj[key];
  return typeof value === "string" ? value : undefined;
};

const getNumber = (
  obj: Record<string, unknown>,
  key: string,
): number | undefined => {
  const value = obj[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
};

const normalizeDailyPoint = (
  entry: unknown,
  fallbackIndex: number,
): OrderStatsDailyPoint => {
  if (!isRecord(entry)) {
    return {
      date: `day-${fallbackIndex}`,
      orders: 0,
      revenue: 0,
    };
  }

  return {
    date:
      getString(entry, "date") ??
      getString(entry, "day") ??
      getString(entry, "label") ??
      `day-${fallbackIndex}`,
    orders:
      getNumber(entry, "orders") ??
      getNumber(entry, "count") ??
      getNumber(entry, "totalOrders") ??
      0,
    revenue:
      getNumber(entry, "revenue") ??
      getNumber(entry, "totalRevenue") ??
      getNumber(entry, "amount") ??
      0,
  };
};

const extractDailySource = (payload: Record<string, unknown>) => {
  const directDaily =
    payload.byDay ??
    payload.daily ??
    payload.timeline ??
    payload.dailyStats ??
    payload.trend ??
    payload.chart;

  if (Array.isArray(directDaily)) {
    return directDaily;
  }

  if (isRecord(directDaily)) {
    // Supports API shape like { "2026-03-10": { orders: 10, revenue: 2000 } }
    return Object.entries(directDaily).map(([date, value]) => {
      if (isRecord(value)) {
        return {
          ...value,
          date,
        };
      }

      return {
        date,
        orders: typeof value === "number" ? value : 0,
        revenue: 0,
      };
    });
  }

  return [];
};

const extractTopProductsSource = (payload: Record<string, unknown>) => {
  const directProducts =
    payload.topProducts ??
    payload.products ??
    payload.productBreakdown ??
    payload.topSellingProducts;

  if (Array.isArray(directProducts)) {
    return directProducts;
  }

  if (isRecord(directProducts)) {
    // Supports map style: { "Pizza": { quantity: 20, revenue: 20000 } }
    return Object.entries(directProducts).map(([name, value]) => {
      if (isRecord(value)) {
        return {
          ...value,
          productName: getString(value, "productName") ?? name,
        };
      }

      return {
        productName: name,
        quantity: typeof value === "number" ? value : 0,
        revenue: 0,
      };
    });
  }

  return [];
};

const normalizeTopProduct = (
  entry: unknown,
  fallbackIndex: number,
): OrderStatsTopProduct => {
  if (!isRecord(entry)) {
    return {
      productName: `Product ${fallbackIndex + 1}`,
      quantity: 0,
      revenue: 0,
    };
  }

  const product = isRecord(entry.product) ? entry.product : undefined;

  return {
    productId: getString(entry, "productId") ?? getString(product ?? {}, "id"),
    productName:
      getString(entry, "productName") ??
      getString(entry, "name") ??
      getString(product ?? {}, "name") ??
      `Product ${fallbackIndex + 1}`,
    quantity:
      getNumber(entry, "quantity") ??
      getNumber(entry, "totalQuantity") ??
      getNumber(entry, "orders") ??
      0,
    revenue:
      getNumber(entry, "revenue") ??
      getNumber(entry, "totalRevenue") ??
      getNumber(entry, "amount") ??
      0,
  };
};

export const normalizeOrderStats = (payload: unknown): OrderStatsResponse => {
  if (!isRecord(payload)) {
    return {
      totalOrders: 0,
      totalGroups: 0,
      grossRevenue: 0,
      deliveredRevenue: 0,
      totalRevenue: 0,
      totalItems: 0,
      averageOrderValue: 0,
      pending: 0,
      confirmed: 0,
      delivered: 0,
      cancelled: 0,
      byDay: [],
      topProducts: [],
    };
  }

  const status = isRecord(payload.status) ? payload.status : {};
  const byStatus = isRecord(payload.byStatus) ? payload.byStatus : {};

  const dailySource = extractDailySource(payload);
  const topProductsSource = extractTopProductsSource(payload);

  const grossRevenue =
    getNumber(payload, "grossRevenue") ??
    getNumber(payload, "totalRevenue") ??
    getNumber(payload, "revenue") ??
    0;

  const deliveredRevenue =
    getNumber(payload, "deliveredRevenue") ??
    getNumber(payload, "realizedRevenue") ??
    getNumber(payload, "completedRevenue") ??
    getNumber(payload, "statusFilteredRevenue") ??
    0;

  return {
    totalOrders:
      getNumber(payload, "totalOrders") ??
      getNumber(payload, "orders") ??
      getNumber(payload, "total") ??
      0,
    totalGroups:
      getNumber(payload, "totalGroups") ?? getNumber(payload, "groups") ?? 0,
    grossRevenue,
    deliveredRevenue,
    totalRevenue: grossRevenue,
    totalItems:
      getNumber(payload, "totalItems") ?? getNumber(payload, "items") ?? 0,
    averageOrderValue:
      getNumber(payload, "averageOrderValue") ??
      getNumber(payload, "avgOrderValue") ??
      getNumber(payload, "average") ??
      0,
    pending:
      getNumber(status, "pending") ??
      getNumber(byStatus, "PENDING") ??
      getNumber(payload, "pending") ??
      0,
    confirmed:
      getNumber(status, "confirmed") ??
      getNumber(byStatus, "CONFIRMED") ??
      getNumber(payload, "confirmed") ??
      0,
    delivered:
      getNumber(status, "delivered") ??
      getNumber(byStatus, "DELIVERED") ??
      getNumber(payload, "delivered") ??
      0,
    cancelled:
      getNumber(status, "cancelled") ??
      getNumber(byStatus, "CANCELLED") ??
      getNumber(payload, "cancelled") ??
      0,
    byDay: dailySource.map((entry, index) => normalizeDailyPoint(entry, index)),
    topProducts: topProductsSource.map((entry, index) =>
      normalizeTopProduct(entry, index),
    ),
  };
};
