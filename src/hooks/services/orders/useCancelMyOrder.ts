"use client";

import {
  orderControllerCancelMyOrder,
  OrderControllerCancelMyOrderData,
} from "@/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { PathOf } from "@/types/client-service.type";
import { toast } from "sonner";

type Path = PathOf<OrderControllerCancelMyOrderData>;

export const useCancelMyOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: Path) => {
      const { data } = await orderControllerCancelMyOrder({ path });
      return data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKeys.MY_ORDERS] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.ADMIN_ORDERS] }),
        queryClient.invalidateQueries({ queryKey: [queryKeys.ORDER_STATS] }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.DASHBOARD_STATS],
        }),
      ]);
      toast.success("Order cancelled");
    },
    onError: () => {
      toast.error("Unable to cancel order");
    },
  });
};
