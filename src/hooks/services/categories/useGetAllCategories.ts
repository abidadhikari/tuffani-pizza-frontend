// useGetMe.tsx

import { categoryControllerFindAll } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetAllCategories = () => {
  const query = useQuery({
    queryKey: [queryKeys.ALL_CATEGORIES],
    queryFn: async () => {
      const { data } = await categoryControllerFindAll();
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
