"use client";
import { userControllerUpdateMe, UserControllerUpdateMeData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../queryKeys";

type Payload = BodyOf<UserControllerUpdateMeData>;

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await userControllerUpdateMe({
        body: payload,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ME] });
      return;
    },
    onError: (error: {
      response: {
        data: {
          message: string;
        };
      };
    }) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    },
  });
};
