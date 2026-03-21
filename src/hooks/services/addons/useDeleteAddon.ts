"use client";

import { addonControllerRemove } from "@/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryKeys } from "../queryKeys";

export const useDeleteAddon = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await addonControllerRemove({
        path: {
          id,
        },
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_ADDONS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_PRODUCT] });
      toast.success("Addon deleted successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
      toast.error("Failed to delete addon");
    },
  });
};
