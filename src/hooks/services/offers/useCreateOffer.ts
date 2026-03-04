"use client";
import { OfferControllerCreateData, offerControllerCreate } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type bodyPayload = BodyOf<OfferControllerCreateData>;

interface Payload {
  body: bodyPayload;
}

export const useCreateOffer = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await offerControllerCreate({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_OFFERS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_OFFER] });
      toast.success("Offer created successfully");
      router.replace("/admin/offers");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
