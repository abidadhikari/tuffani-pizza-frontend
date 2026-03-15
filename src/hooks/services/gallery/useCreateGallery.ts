"use client";
import {
  staticContentControllerAddToGallery,
  StaticContentControllerAddToGalleryData,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<StaticContentControllerAddToGalleryData>;

interface Payload {
  body: bodyPayload;
}

export const useCreateGalleryItem = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await staticContentControllerAddToGallery({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ALL_GALLERY],
      });

      toast.success("Gallery item created successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
