"use client";
import {
  OfferControllerUpdateData,
  offerControllerRemove,
  offerControllerUpdate,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

export const useDeleteOffer = (handleSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await offerControllerRemove({
        path: {
          id,
        },
      });
      return data;
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_OFFERS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_OFFER] });
      toast.success("Offer deleted successfully");
      handleSuccess?.();
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
