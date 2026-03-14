"use client";

import {
  orderControllerFindMyOrders,
  OrderControllerFindMyOrdersData,
} from "@/client";
import { QueryOf } from "@/types/client-service.type";
import { PaginatedOrdersResponse } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { normalizePaginatedOrders } from "./order-normalizer";

type Payload = QueryOf<OrderControllerFindMyOrdersData>;

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
      return normalizePaginatedOrders(
        data,
        payload.page ?? 1,
        payload.limit ?? 10,
      );
    },
  });
};
