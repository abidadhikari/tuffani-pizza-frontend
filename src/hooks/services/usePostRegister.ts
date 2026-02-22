"use client";
import { authControllerRegister, AuthControllerRegisterData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
    onSuccess: () => {
      navigate.push("/");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
