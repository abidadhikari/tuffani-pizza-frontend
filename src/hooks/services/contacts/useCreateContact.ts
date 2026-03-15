"use client";
import { ContactControllerCreateData, contactControllerCreate } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type bodyPayload = BodyOf<ContactControllerCreateData>;

interface Payload {
  body: bodyPayload;
}

export const useCreateContact = (handleOnSuccess?: () => void) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await contactControllerCreate({
        ...payload,
      });
      return data;
    },
    onSuccess: () => {
      handleOnSuccess?.();
      router.push("/");
      toast.success("Message sent successfully. We will get back to you soon!");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
      toast.error("Failed to send message. Please try again later.");
    },
  });
};
