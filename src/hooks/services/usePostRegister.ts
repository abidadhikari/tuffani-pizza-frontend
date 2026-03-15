"use client";
import { authControllerRegister, AuthControllerRegisterData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Payload = BodyOf<AuthControllerRegisterData>;

export const usePostRegister = () => {
  const navigate = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await authControllerRegister({
        body: payload,
      });
      return data;
    },
    onSuccess: (_, payload) => {
      navigate.push("/verify-otp?email=" + payload?.email);
      toast.success(
        "Registration successful. Please check your email for OTP verification.",
      );
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    },
  });
};
