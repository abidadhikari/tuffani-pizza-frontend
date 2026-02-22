"use client";
import { authControllerLogin, AuthControllerLoginData } from "@/client";
import { BodyOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type Payload = BodyOf<AuthControllerLoginData>;

export const usePostLogin = () => {
  const navigate = useRouter();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await authControllerLogin({
        body: payload,
      });
      return data;
    },
    onSuccess: (response) => {
      console.log(response);
      if (response?.user?.isVerified) {
        console.log("User is verified, navigating to dashboard", response);
        localStorage.setItem("token", response?.accessToken);
        navigate.push("/dashboard");
        return;
      }
      navigate.push("/unverified");
    },
    onError: (error: AxiosError) => {
      console.log(error?.response);
    },
  });
};
