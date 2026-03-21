import {
  NormalizedOrder,
  NormalizedOrderItem,
  OrderStatus,
  PaginatedOrdersResponse,
} from "@/types/order";

const FALLBACK_META = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const ORDER_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "DELIVERED",
  "CANCELLED",
];

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

const getStatus = (value: unknown): OrderStatus => {
  if (typeof value !== "string") {
    return "PENDING";
  }

  if (ORDER_STATUSES.includes(value as OrderStatus)) {
    return value as OrderStatus;
  }

  return "PENDING";
};

const getVariantSize = (
  item: Record<string, unknown>,
): "SMALL" | "MEDIUM" | "LARGE" | undefined => {
  const directSize = getString(item, "variantSize") ?? getString(item, "size");
  const nestedVariant = isRecord(item.variant) ? item.variant : undefined;
  const nestedProductVariant = isRecord(item.productVariant)
    ? item.productVariant
    : undefined;
  const nestedSize =
    getString(nestedVariant ?? {}, "size") ??
    getString(nestedProductVariant ?? {}, "size");

  const size = directSize ?? nestedSize;
  if (size === "SMALL" || size === "MEDIUM" || size === "LARGE") {
    return size;
  }

  return undefined;
};

const normalizeSelectedAddons = (
  item: Record<string, unknown>,
  productObject?: Record<string, unknown>,
  orderObject?: Record<string, unknown>,
): Array<{ id: string; name: string; price: number }> | undefined => {
  const sources = [
    item.addons,
    item.selectedAddons,
    item.orderAddons,
    item.productAddons,
    productObject?.addons,
    productObject?.selectedAddons,
    productObject?.orderAddons,
    productObject?.productAddons,
    orderObject?.addons,
    orderObject?.selectedAddons,
    orderObject?.orderAddons,
    orderObject?.productAddons,
  ];

  for (const source of sources) {
    if (!Array.isArray(source)) continue;

    const parsed = source
      .filter((entry): entry is Record<string, unknown> => isRecord(entry))
      .map((entry, index) => {
        const nestedAddon = isRecord(entry.addon) ? entry.addon : undefined;
        const id =
          getString(entry, "addonId") ??
          getString(nestedAddon ?? {}, "id") ??
          getString(entry, "id");
        const name =
          getString(entry, "name") ??
          getString(entry, "addonName") ??
          getString(entry, "title") ??
          getString(nestedAddon ?? {}, "name");
        const price =
          getNumber(entry, "price") ??
          getNumber(entry, "addonUnitPrice") ??
          getNumber(nestedAddon ?? {}, "price") ??
          0;

        if (!id && !name) return null;

        return {
          id: id ?? `addon-${index}`,
          name: name ?? "Addon",
          price,
        };
      })
      .filter(
        (addon): addon is { id: string; name: string; price: number } =>
          addon !== null,
      );

    if (parsed.length > 0) {
      return parsed;
    }
  }

  const fallbackAddonIds = [
    item.addonIds,
    productObject?.addonIds,
    orderObject?.addonIds,
  ].find((value) => Array.isArray(value));

  if (Array.isArray(fallbackAddonIds)) {
    const parsedFromIds = fallbackAddonIds
      .filter((entry): entry is string => typeof entry === "string")
      .map((id) => ({
        id,
        name: "Addon",
        price: 0,
      }));

    if (parsedFromIds.length > 0) {
      return parsedFromIds;
    }
  }

  return undefined;
};

const normalizeOrderItem = (
  item: unknown,
  fallbackIndex: number,
  orderObject?: Record<string, unknown>,
): NormalizedOrderItem => {
  if (!isRecord(item)) {
    return {
      id: `item-${fallbackIndex}`,
      productId: "",
      productName: "Unknown product",
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
    };
  }

  const product = isRecord(item.product) ? item.product : undefined;
  const productSnapshot = isRecord(item.productSnapshot)
    ? item.productSnapshot
    : undefined;
  const productObject = product ?? productSnapshot;
  const quantity = getNumber(item, "quantity") ?? 0;
  const unitPrice =
    getNumber(item, "price") ??
    getNumber(item, "unitPrice") ??
    getNumber(item, "productPrice") ??
    getNumber(productObject ?? {}, "price") ??
    0;
  const totalPrice =
    getNumber(item, "total") ??
    getNumber(item, "totalPrice") ??
    quantity * unitPrice;

  const productName =
    getString(item, "productName") ??
    getString(item, "name") ??
    getString(item, "title") ??
    getString(productObject ?? {}, "name") ??
    getString(productObject ?? {}, "title") ??
    "Unknown product";

  const imageAsset = isRecord(productObject?.mainImage)
    ? productObject.mainImage
    : undefined;
  const itemMainProductImage = isRecord(item.mainProductImage)
    ? item.mainProductImage
    : undefined;
  const productMainProductImage = isRecord(productObject?.mainProductImage)
    ? productObject.mainProductImage
    : undefined;
  const orderMainProductImage = isRecord(orderObject?.mainProductImage)
    ? orderObject.mainProductImage
    : undefined;

  const gallery = Array.isArray(productObject?.images)
    ? productObject.images
    : [];
  const firstGalleryImage = gallery.find((image) => isRecord(image));

  return {
    id: getString(item, "id") ?? `item-${fallbackIndex}`,
    productId:
      getString(item, "productId") ??
      getString(productObject ?? {}, "id") ??
      getString(orderObject ?? {}, "productId") ??
      "",
    productName,
    variantSize: getVariantSize(item),
    selectedAddons: normalizeSelectedAddons(item, productObject, orderObject),
    quantity,
    unitPrice,
    totalPrice,
    imageUrl:
      getString(item, "imageUrl") ??
      getString(item, "image") ??
      getString(item, "mainProductImage") ??
      getString(itemMainProductImage ?? {}, "url") ??
      getString(productObject ?? {}, "imageUrl") ??
      getString(productObject ?? {}, "image") ??
      getString(productObject ?? {}, "mainProductImage") ??
      getString(productMainProductImage ?? {}, "url") ??
      getString(orderObject ?? {}, "mainProductImage") ??
      getString(orderMainProductImage ?? {}, "url") ??
      getString(imageAsset ?? {}, "url") ??
      (isRecord(firstGalleryImage)
        ? getString(firstGalleryImage, "url")
        : undefined),
  };
};

const getOrderItemsRaw = (order: Record<string, unknown>) => {
  if (Array.isArray(order.items)) return order.items;
  if (Array.isArray(order.orderItems)) return order.orderItems;
  if (Array.isArray(order.order_items)) return order.order_items;
  return [];
};

const isLineItemPayload = (entry: Record<string, unknown>) => {
  const hasProductReference =
    typeof entry.productId === "string" || isRecord(entry.product);
  const hasQuantity = getNumber(entry, "quantity") !== undefined;
  return hasProductReference && hasQuantity;
};

const normalizeOrder = (
  order: unknown,
  fallbackIndex: number,
): NormalizedOrder => {
  if (!isRecord(order)) {
    return {
      id: `order-${fallbackIndex}`,
      status: "PENDING",
      totalAmount: 0,
      items: [],
    };
  }

  const itemsRaw = getOrderItemsRaw(order);
  const normalizedItems =
    itemsRaw.length > 0
      ? itemsRaw.map((item, index) => normalizeOrderItem(item, index, order))
      : isLineItemPayload(order)
        ? [normalizeOrderItem(order, fallbackIndex, order)]
        : [];

  const totalFromItems = normalizedItems.reduce(
    (sum, current) => sum + current.totalPrice,
    0,
  );

  const user = isRecord(order.user) ? order.user : undefined;
  const orderGroup = isRecord(order.orderGroup) ? order.orderGroup : undefined;

  return {
    id: getString(order, "id") ?? `order-${fallbackIndex}`,
    orderGroupId:
      getString(order, "orderGroupId") ??
      getString(order, "groupId") ??
      getString(orderGroup ?? {}, "id"),
    status: getStatus(order.status),
    totalAmount:
      getNumber(order, "total") ??
      getNumber(order, "totalPrice") ??
      getNumber(order, "totalAmount") ??
      totalFromItems,
    createdAt: getString(order, "createdAt"),
    updatedAt: getString(order, "updatedAt"),
    userId: getString(order, "userId") ?? getString(user ?? {}, "id"),
    userName: getString(order, "userName") ?? getString(user ?? {}, "name"),
    userEmail: getString(order, "userEmail") ?? getString(user ?? {}, "email"),
    userPhone: getString(order, "userPhone") ?? getString(user ?? {}, "phone"),
    items: normalizedItems,
  };
};

export const normalizePaginatedOrders = (
  payload: unknown,
  fallbackPage = 1,
  fallbackLimit = 10,
): PaginatedOrdersResponse => {
  if (!isRecord(payload)) {
    return {
      data: [],
      meta: {
        ...FALLBACK_META,
        page: fallbackPage,
        limit: fallbackLimit,
      },
    };
  }

  const listSource = Array.isArray(payload.data)
    ? payload.data
    : Array.isArray(payload.items)
      ? payload.items
      : [];

  const data = listSource.map((order, index) => normalizeOrder(order, index));

  const rawMeta = isRecord(payload.meta) ? payload.meta : {};

  const page = getNumber(rawMeta, "page") ?? fallbackPage;
  const limit = getNumber(rawMeta, "limit") ?? fallbackLimit;
  const total = getNumber(rawMeta, "total") ?? data.length;
  const totalPages =
    getNumber(rawMeta, "totalPages") ??
    (limit > 0 ? Math.ceil(total / limit) : 1);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};
