// useGetMe.tsx

import { productControllerFindAll } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetAllProducts = () => {
  const query = useQuery<unknown | undefined, Error>({
    queryKey: [queryKeys.ALL_PRODUCTS],
    queryFn: async () => {
      const { data } = await productControllerFindAll();
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
