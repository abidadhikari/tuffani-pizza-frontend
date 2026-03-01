"use client";
import {
  StaticContentControllerUpdateWithKeyData,
  staticContentControllerUpdateWithKey,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<StaticContentControllerUpdateWithKeyData>;

interface Payload {
  body: bodyPayload;
  key: string;
}

export const useUpdateStaticContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await staticContentControllerUpdateWithKey({
        ...payload,
        path: {
          key: payload.key,
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Static content updated successfully");
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_PRODUCT] });
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
