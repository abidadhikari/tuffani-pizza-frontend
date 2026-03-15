"use client";

import {
  userControllerUpdateUserByAdmin,
  UserControllerUpdateUserByAdminData,
} from "@/client";
import { BodyOf, PathOf } from "@/types/client-service.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../queryKeys";

interface Payload {
  body: BodyOf<UserControllerUpdateUserByAdminData>;
  path: PathOf<UserControllerUpdateUserByAdminData>;
}

export const useUpdateUserByAdmin = (handleSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await userControllerUpdateUserByAdmin(payload);
      return data;
    },
    onSuccess: () => {
      toast.success("User updated successfully.");
      queryClient.invalidateQueries({ queryKey: [queryKeys.ALL_USERS] });
      handleSuccess?.();
    },
    onError: (error: {
      response?: {
        data?: {
          message?: string;
        };
      };
    }) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update user. Please try again.",
      );
    },
  });
};
