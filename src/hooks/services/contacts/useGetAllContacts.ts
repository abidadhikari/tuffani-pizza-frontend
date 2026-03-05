// useGetMe.tsx

import {
  contactControllerFindAll,
  ContactControllerFindAllData,
  PaginatedContactResponseDto,
} from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { QueryOf } from "@/types/client-service.type";

type queryType = QueryOf<ContactControllerFindAllData>;

export const useGetAllContacts = (payload: queryType) => {
  const query = useQuery<PaginatedContactResponseDto | undefined, Error>({
    queryKey: [
      queryKeys.ALL_CONTACTS,
      payload.page,
      payload.limit,
      payload.isRead,
    ],
    queryFn: async () => {
      const { data } = await contactControllerFindAll({
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
