// useGetMe.tsx

import { BaseUserResponseDto, userControllerGetMe } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { useAppDispatch } from "@/store/storeHook";
import { setUser } from "@/store/features/auth/authSlice";

export const useGetMe = () => {
  const dispatch = useAppDispatch();
  const query = useQuery<BaseUserResponseDto | undefined, Error>({
    queryKey: [queryKeys.GET_ME],
    queryFn: async () => {
      const { data } = await userControllerGetMe();
      return data;
    },
  });

  useEffect(() => {
    if (!query.isSuccess) return;

    if (query.data) {
      const user = query.data;
      console.log("User data fetched successfully:", user);
      dispatch(setUser(user));
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (!query.isError) return;
  }, [query.isError]);

  return query;
};
