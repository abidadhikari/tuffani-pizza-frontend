"use client";
import { productControllerUpdate, ProductControllerUpdateData } from "@/client";
import { BodyOf, PathOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";

type bodyPayload = BodyOf<ProductControllerUpdateData>;

interface Payload {
  body: bodyPayload;
  id: string;
}

export const usePatchProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await productControllerUpdate({
        ...payload,
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_PRODUCT] });
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
