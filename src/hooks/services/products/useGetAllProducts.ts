// useGetMe.tsx

import {
  PaginatedProductResponseDto,
  productControllerFindAllAdmin,
  ProductControllerFindAllAdminData,
} from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { QueryOf } from "@/types/client-service.type";

type PayloadType = QueryOf<ProductControllerFindAllAdminData>;

export const useGetAllProducts = (payload: PayloadType) => {
  const query = useQuery<PaginatedProductResponseDto | undefined, Error>({
    queryKey: [
      queryKeys.ALL_PRODUCTS,
      payload.limit,
      payload.page,
      payload.search,
      payload.visible,
    ],
    queryFn: async () => {
      const { data } = await productControllerFindAllAdmin({
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
