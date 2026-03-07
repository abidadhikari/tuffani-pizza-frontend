"use client";
import { authControllerLogout, LoginResponseDto } from "@/client";
import { clearUser } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/storeHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await authControllerLogout();
      return data as LoginResponseDto;
    },
    onSuccess: () => {
      toast.success("Logged out successfully.");
      queryClient.clear();
      dispatch(clearUser());
      navigate.push("/login");
    },
    onError: (error: {
      response: {
        data: {
          message: string;
        };
      };
    }) => {
      toast.error(
        error?.response?.data?.message || "Logout failed. Please try again.",
      );
    },
  });
};
