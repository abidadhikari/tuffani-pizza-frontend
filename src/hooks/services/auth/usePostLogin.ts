"use client";
import {
  authControllerLogin,
  AuthControllerLoginData,
  LoginResponseDto,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Payload = BodyOf<AuthControllerLoginData>;

export const usePostLogin = () => {
  const navigate = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload): Promise<LoginResponseDto> => {
      const { data } = await authControllerLogin({
        body: payload,
      });
      return data as LoginResponseDto;
    },
    onSuccess: (response: LoginResponseDto) => {
      if (response?.user?.isVerified && response?.accessToken) {
        toast.success("Login successful. Welcome back!");
        if (
          response?.user?.role === "ADMIN" ||
          response?.user?.role === "SUPER_ADMIN"
        ) {
          navigate.push("/admin");
          return;
        }
        navigate.replace("/");
        return;
      }

      if (!response?.user?.isVerified) {
        navigate.push("/verify-otp?email=" + response?.user?.email);
        return;
      }

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
        error?.response?.data?.message || "Login failed. Please try again.",
      );
    },
  });
};
