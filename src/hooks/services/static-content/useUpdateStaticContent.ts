"use client";
import {
  StaticContentControllerUpdateWithKeyData,
  staticContentControllerUpdateWithKey,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<StaticContentControllerUpdateWithKeyData>;

interface Payload {
  body:
    | {
        value: JSON;
      }
    | bodyPayload;
  key: string;
}

export const useUpdateStaticContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await staticContentControllerUpdateWithKey({
        body: payload.body as bodyPayload,
        path: {
          key: payload.key,
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Static content updated successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
