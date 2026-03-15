"use client";
import {
  testimonialControllerUpdate,
  TestimonialControllerUpdateData,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<TestimonialControllerUpdateData>;

interface Payload {
  body: bodyPayload;
  id: string;
}

export const usePatchTestimonial = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await testimonialControllerUpdate({
        ...payload,
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
      toast.success("Testimonial updated successfully");
      onSuccessCallback?.();
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
