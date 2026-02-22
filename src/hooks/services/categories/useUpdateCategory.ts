"use client";
import {
  categoryControllerUpdate,
  CategoryControllerUpdateData,
} from "@/client";
import { BodyOf, PathOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

interface Payload {
  body: BodyOf<CategoryControllerUpdateData>;
  id: string;
}

export const useUpdateCategory = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await categoryControllerUpdate({
        ...payload,
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_CATEGORIES] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_CATEGORY] });
      toast.success("Category updated successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
