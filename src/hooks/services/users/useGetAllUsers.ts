// useGetMe.tsx

import { PaginatedUserResponseDto, userControllerGetAllUsers } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetAllUsers = () => {
  const query = useQuery<PaginatedUserResponseDto | undefined, Error>({
    queryKey: [queryKeys.ALL_USERS],
    queryFn: async () => {
      const { data } = await userControllerGetAllUsers();
      return data;
    },
  });

  useEffect(() => {
    if (!query.isSuccess) return;

    if (query.data) {
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (!query.isError) return;
  }, [query.isError]);

  return query;
};
