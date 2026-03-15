"use client";
import {
  authControllerForgotPassword,
  AuthControllerForgotPasswordData,
  ForgotPasswordResponseDto,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Payload = BodyOf<AuthControllerForgotPasswordData>;

export const usePostForgotPassword = () => {
  const navigate = useRouter();
  return useMutation({
    mutationFn: async (
      payload: Payload,
    ): Promise<ForgotPasswordResponseDto | undefined> => {
      const { data } = await authControllerForgotPassword({
        body: payload,
      });
      return data;
    },
    onSuccess: (response, payload) => {
      // navigate.push("/unverified");
      toast.success(
        response?.message || "OTP sent successfully. Please check your email.",
      );
      navigate.push("/verify-otp?type=reset&email=" + payload?.email);
    },
    onError: (error: {
      response: {
        data: {
          message: string;
        };
      };
    }) => {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again.",
      );
    },
  });
};
