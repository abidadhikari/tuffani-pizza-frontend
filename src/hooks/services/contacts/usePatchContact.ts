"use client";
import { contactControllerUpdate, ContactControllerUpdateData } from "@/client";
import { BodyOf, PathOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { toast } from "sonner";

type bodyPayload = BodyOf<ContactControllerUpdateData>;

interface Payload {
  body: bodyPayload;
  id: string;
}

export const usePatchContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await contactControllerUpdate({
        ...payload,
        path: {
          id: payload.id,
        },
      });
      return data;
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_CONTACTS] });
      toast.success("Contact updated successfully");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
