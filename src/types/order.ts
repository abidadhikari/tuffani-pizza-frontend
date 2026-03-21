export type OrderStatus = "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED";

export interface CartItem {
  productId: string;
  variantSize?: "SMALL" | "MEDIUM" | "LARGE";
  name: string;
  price: number;
  crossedPrice?: number | null;
  imageUrl?: string;
  quantity: number;
  type?: string;
}

export interface NormalizedOrderItem {
  id: string;
  productId: string;
  productName: string;
  variantSize?: "SMALL" | "MEDIUM" | "LARGE";
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface NormalizedOrder {
  id: string;
  orderGroupId?: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  items: NormalizedOrderItem[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedOrdersResponse {
  data: NormalizedOrder[];
  meta: PaginationMeta;
}

export interface OrderStatsDailyPoint {
  date: string;
  orders: number;
  revenue: number;
}

export interface OrderStatsTopProduct {
  productId?: string;
  productName: string;
  quantity: number;
  revenue: number;
}

export interface OrderStatsResponse {
  totalOrders: number;
  totalGroups: number;
  grossRevenue: number;
  deliveredRevenue: number;
  totalRevenue: number;
  totalItems: number;
  averageOrderValue: number;
  pending: number;
  confirmed: number;
  delivered: number;
  cancelled: number;
  byDay: OrderStatsDailyPoint[];
  topProducts: OrderStatsTopProduct[];
}
