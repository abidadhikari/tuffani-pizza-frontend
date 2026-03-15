"use client";
import {
  AuthControllerVerifyAccountData,
  authControllerVerifyAccount,
  LoginResponseDto,
  VerifyAccountResponseDto,
} from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Payload = BodyOf<AuthControllerVerifyAccountData>;

export const useVerifyAccount = () => {
  const navigate = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload): Promise<VerifyAccountResponseDto> => {
      const { data } = await authControllerVerifyAccount({
        body: payload,
      });
      return data as VerifyAccountResponseDto;
    },
    onSuccess: (response: VerifyAccountResponseDto) => {
      if (response?.accessToken) {
        navigate.push("/login");
        toast.success("Account verified successfully. Please log in.");
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
