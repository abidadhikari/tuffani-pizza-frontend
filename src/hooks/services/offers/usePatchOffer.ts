"use client";
import {
  blogControllerUpdate,
  OfferControllerUpdateData,
  offerControllerUpdate,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<OfferControllerUpdateData>;

interface Payload {
  body: bodyPayload;
  id: string;
}

export const usePatchOffer = (handleSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await offerControllerUpdate({
        ...payload,
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_OFFERS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_OFFER] });
      toast.success("Offer updated successfully");
      handleSuccess?.();
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
