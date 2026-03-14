"use client";

import {
  orderControllerGetOrderStats,
  OrderControllerGetOrderStatsData,
} from "@/client";
import { QueryOf } from "@/types/client-service.type";
import { OrderStatsResponse } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { normalizeOrderStats } from "./order-stats-normalizer";

type Payload = QueryOf<OrderControllerGetOrderStatsData>;

export const useGetOrderStats = (payload: Payload) => {
  return useQuery<OrderStatsResponse, Error>({
    queryKey: [
      queryKeys.ORDER_STATS,
      payload.fromDate,
      payload.toDate,
      payload.status,
      payload.userId,
      payload.search,
      payload.maxRows,
    ],
    queryFn: async () => {
      const { data } = await orderControllerGetOrderStats({ query: payload });
      return normalizeOrderStats(data);
    },
  });
};
