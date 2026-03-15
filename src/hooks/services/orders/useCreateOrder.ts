"use client";

import { orderControllerCreate, OrderControllerCreateData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type CreateOrderBody = BodyOf<OrderControllerCreateData>;

interface Payload {
  body: CreateOrderBody;
}

export const useCreateOrder = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await orderControllerCreate({
        ...payload,
      });
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
      onSuccessCallback?.();
      toast.success("Order placed successfully");
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });
};
