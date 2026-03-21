"use client";

import {
  addonControllerFindAll,
  orderControllerFindMyOrders,
  OrderControllerFindMyOrdersData,
} from "@/client";
import { QueryOf } from "@/types/client-service.type";
import { PaginatedOrdersResponse } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { normalizePaginatedOrders } from "./order-normalizer";

type Payload = QueryOf<OrderControllerFindMyOrdersData>;

const hydrateOrderAddons = async (
  paginatedOrders: PaginatedOrdersResponse,
): Promise<PaginatedOrdersResponse> => {
  const needsHydration = paginatedOrders.data.some((order) =>
    order.items.some((item) =>
      (item.selectedAddons ?? []).some(
        (addon) => addon.name === "Addon" || addon.price === 0,
      ),
    ),
  );

  if (!needsHydration) {
    return paginatedOrders;
  }

  try {
    const { data } = await addonControllerFindAll();
    const addonList = Array.isArray(data) ? data : [];
    const addonById = new Map(
      addonList
        .filter(
          (addon): addon is { id: string; name: string; price: number } =>
            typeof addon?.id === "string" &&
            typeof addon?.name === "string" &&
            (typeof addon?.price === "number" ||
              typeof addon?.price === "string"),
        )
        .map((addon) => [
          addon.id,
          {
            id: addon.id,
            name: addon.name,
            price: Number(addon.price),
          },
        ]),
    );

    return {
      ...paginatedOrders,
      data: paginatedOrders.data.map((order) => ({
        ...order,
        items: order.items.map((item) => ({
          ...item,
          selectedAddons: (item.selectedAddons ?? []).map((addon) => {
            const hydrated = addonById.get(addon.id);
            if (!hydrated) return addon;

            return {
              id: addon.id,
              name: addon.name === "Addon" ? hydrated.name : addon.name,
              price: addon.price > 0 ? addon.price : hydrated.price,
            };
          }),
        })),
      })),
    };
  } catch {
    return paginatedOrders;
  }
};

export const useGetMyOrders = (payload: Payload) => {
  return useQuery<PaginatedOrdersResponse, Error>({
    queryKey: [
      queryKeys.MY_ORDERS,
      payload.page,
      payload.limit,
      payload.status,
      payload.orderGroupId,
      payload.search,
      payload.userId,
    ],
    queryFn: async () => {
      const { data } = await orderControllerFindMyOrders({ query: payload });
      const normalized = normalizePaginatedOrders(
        data,
        payload.page ?? 1,
        payload.limit ?? 10,
      );
      return hydrateOrderAddons(normalized);
    },
  });
};
