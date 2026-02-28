"use client";
import {
  testimonialControllerCreate,
  TestimonialControllerCreateData,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<TestimonialControllerCreateData>;

interface Payload {
  body: bodyPayload;
}

export const useCreateTestimonial = (handleOnSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await testimonialControllerCreate({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_TESTIMONIALS] });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.SINGLE_TESTIMONIAL],
      });
      toast.success("Testimonial created successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
