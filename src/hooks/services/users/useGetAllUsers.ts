// useGetMe.tsx

import {
  PaginatedUserResponseDto,
  userControllerGetAllUsers,
  UserControllerGetAllUsersData,
} from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { QueryOf } from "@/types/client-service.type";

type queryType = QueryOf<UserControllerGetAllUsersData>;

export const useGetAllUsers = (payload: queryType) => {
  const query = useQuery<PaginatedUserResponseDto | undefined, Error>({
    queryKey: [
      queryKeys.ALL_USERS,
      payload.page,
      payload.limit,
      payload.search,
      payload.isVerified,
      payload.role,
      payload.status,
    ],
    queryFn: async () => {
      const { data } = await userControllerGetAllUsers({
        query: payload,
      });
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
