// useGetMe.tsx

import {
  blogControllerFindAll,
  BlogControllerFindAllData,
  BlogResponseDto,
  PaginatedBlogResponseDto,
} from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { QueryOf } from "@/types/client-service.type";

type PayloadType = QueryOf<BlogControllerFindAllData>;

export const useGetAllBlogs = (payload: PayloadType) => {
  const query = useQuery<PaginatedBlogResponseDto | undefined, Error>({
    queryKey: [
      queryKeys.ALL_BLOGS,
      payload.limit,
      payload.page,
      payload.search,
      payload.visible,
    ],
    queryFn: async () => {
      const { data } = await blogControllerFindAll({
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
