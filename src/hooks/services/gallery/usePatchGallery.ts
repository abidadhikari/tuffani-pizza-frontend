"use client";
import {
  staticContentControllerUpdateGalleryItem,
  StaticContentControllerUpdateGalleryItemData,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<StaticContentControllerUpdateGalleryItemData>;

interface Payload {
  body: bodyPayload;
  id: string;
}

export const usePatchGallery = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await staticContentControllerUpdateGalleryItem({
        ...payload,
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_GALLERY] });

      toast.success("Gallery item updated successfully");
      onSuccessCallback?.();
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
