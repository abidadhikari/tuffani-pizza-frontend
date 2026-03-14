"use client";

import {
  orderControllerUpdateStatus,
  OrderControllerUpdateStatusData,
} from "@/client";
import { BodyOf, PathOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type Path = PathOf<OrderControllerUpdateStatusData>;
type Body = BodyOf<OrderControllerUpdateStatusData>;

interface Payload {
  path: Path;
  body: Body;
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await orderControllerUpdateStatus(payload);
      return data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.ADMIN_ORDERS] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.MY_ORDERS] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.ORDER_STATS] }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.DASHBOARD_STATS],
        }),
      ]);
      toast.success("Order status updated");
    },
    onError: () => {
      toast.error("Failed to update order status");
    },
  });
};
