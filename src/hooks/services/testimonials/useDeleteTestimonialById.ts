"use client";
import {
  testimonialControllerRemove,
  TestimonialControllerRemoveData,
} from "@/client";
import { BodyOf, PathOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type Payload = PathOf<TestimonialControllerRemoveData>;

export const useDeleteTestimonialById = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await testimonialControllerRemove({
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_TESTIMONIALS] });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.SINGLE_TESTIMONIAL],
      });
      toast.success("Testimonial deleted successfully");
      onSuccessCallback?.();
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
