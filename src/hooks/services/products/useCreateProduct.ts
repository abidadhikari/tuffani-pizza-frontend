"use client";
import { ProductControllerCreateData, productControllerCreate } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type bodyPayload = BodyOf<ProductControllerCreateData>;

interface Payload {
  body: bodyPayload;
}

export const useCreateProduct = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await productControllerCreate({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_PRODUCT] });
      router.replace("/admin/products");
      toast.success("Product created successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
