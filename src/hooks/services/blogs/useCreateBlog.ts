"use client";
import { BlogControllerCreateData, blogControllerCreate } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type bodyPayload = BodyOf<BlogControllerCreateData>;

interface Payload {
  body: bodyPayload;
}

export const useCreateBlog = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await blogControllerCreate({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_BLOGS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.SINGLE_BLOG] });
      toast.success("Blog created successfully");
      router.replace("/admin/blogs");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
