// useGetMe.tsx

import { blogControllerFindAll, BlogResponseDto } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetAllBlogs = () => {
  const query = useQuery<BlogResponseDto[] | undefined, Error>({
    queryKey: [queryKeys.ALL_BLOGS],
    queryFn: async () => {
      const { data } = await blogControllerFindAll();
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
