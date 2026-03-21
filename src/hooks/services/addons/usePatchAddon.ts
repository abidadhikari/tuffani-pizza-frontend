"use client";

import { addonControllerUpdate, AddonControllerUpdateData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryKeys } from "../queryKeys";

type BodyPayload = BodyOf<AddonControllerUpdateData>;

interface Payload {
  id: string;
  body: BodyPayload;
}

export const usePatchAddon = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await addonControllerUpdate({
        body: payload.body,
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_ADDONS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_PRODUCT] });
      toast.success("Addon updated successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
      toast.error("Failed to update addon");
    },
  });
};
