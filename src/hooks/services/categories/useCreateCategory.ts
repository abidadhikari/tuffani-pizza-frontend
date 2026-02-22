"use client";
import {
  categoryControllerCreate,
  CategoryControllerCreateData,
} from "@/client";
import { BodyOf, PathOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<CategoryControllerCreateData>;

interface Payload {
  body: bodyPayload;
}

export const useCreateCategory = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await categoryControllerCreate({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_CATEGORIES] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_CATEGORY] });
      toast.success("Category created successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
