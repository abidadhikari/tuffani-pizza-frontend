"use client";
import {
  AuthControllerResetPasswordData,
  authControllerResetPassword,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Payload = BodyOf<AuthControllerResetPasswordData>;

export const useResetPassword = () => {
  const navigate = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await authControllerResetPassword({
        body: payload,
      });
      return data;
    },
    onSuccess: (response) => {
      navigate.push("/login");
      toast.success("Password reset successfully. Please log in.");

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
        error?.response?.data?.message || "Reset failed. Please try again.",
      );
    },
  });
};
