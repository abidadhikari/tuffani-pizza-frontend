"use client";

import {
  orderControllerFindAllForAdmin,
  OrderControllerFindAllForAdminData,
} from "@/client";
import { QueryOf } from "@/types/client-service.type";
import { PaginatedOrdersResponse } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { normalizePaginatedOrders } from "./order-normalizer";

type Payload = QueryOf<OrderControllerFindAllForAdminData>;

export const useGetAllOrdersForAdmin = (payload: Payload) => {
  return useQuery<PaginatedOrdersResponse, Error>({
    queryKey: [
      queryKeys.ADMIN_ORDERS,
      payload.page,
      payload.limit,
      payload.status,
      payload.orderGroupId,
      payload.search,
      payload.userId,
    ],
    queryFn: async () => {
      const { data } = await orderControllerFindAllForAdmin({ query: payload });
      return normalizePaginatedOrders(
        data,
        payload.page ?? 1,
        payload.limit ?? 10,
      );
    },
  });
};
