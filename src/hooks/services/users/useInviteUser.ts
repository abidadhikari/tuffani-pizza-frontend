"use client";
import {
  userControllerInviteUser,
  UserControllerInviteUserData,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../queryKeys";

type Payload = BodyOf<UserControllerInviteUserData>;

export const useInviteUser = (handleSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await userControllerInviteUser({
        body: payload,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("User Invited successfully.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_USERS] });

      handleSuccess?.();
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
          "Failed to invite user. Please try again.",
      );
    },
  });
};
