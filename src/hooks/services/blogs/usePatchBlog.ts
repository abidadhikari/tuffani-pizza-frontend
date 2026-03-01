"use client";
import { blogControllerUpdate, BlogControllerUpdateData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<BlogControllerUpdateData>;

interface Payload {
  body: bodyPayload;
  id: string;
}

export const usePatchBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await blogControllerUpdate({
        ...payload,
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_BLOGS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_BLOG] });
      toast.success("Blog updated successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
