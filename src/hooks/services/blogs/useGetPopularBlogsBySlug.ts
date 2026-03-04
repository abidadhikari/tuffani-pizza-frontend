"use client";

import { blogControllerFindRecommended, BlogResponseDto } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetPopularBlogsBySlug = (slug: string) => {
  const query = useQuery<BlogResponseDto[] | undefined, Error>({
    queryKey: [queryKeys.POPULAR_BLOGS, slug],
    queryFn: async () => {
      const { data } = await blogControllerFindRecommended({
        path: { slug },
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
