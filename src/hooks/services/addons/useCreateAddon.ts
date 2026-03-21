"use client";

import { addonControllerCreate, AddonControllerCreateData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryKeys } from "../queryKeys";

type BodyPayload = BodyOf<AddonControllerCreateData>;

interface Payload {
  body: BodyPayload;
}

export const useCreateAddon = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await addonControllerCreate({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_ADDONS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_PRODUCT] });
      toast.success("Addon created successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
      toast.error("Failed to create addon");
    },
  });
};
