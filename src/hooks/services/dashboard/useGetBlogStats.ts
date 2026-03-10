import {
  BlogsStatsResponseDto,
  statsControllerGetBlogStats,
  StatsControllerGetBlogStatsData,
} from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { QueryOf } from "@/types/client-service.type";

type payload = QueryOf<StatsControllerGetBlogStatsData>;

export const useGetBlogStats = (payload: payload) => {
  const query = useQuery<BlogsStatsResponseDto[] | undefined, Error>({
    queryKey: [queryKeys.BLOG_STATS, payload.orderBy],
    queryFn: async () => {
      const { data } = await statsControllerGetBlogStats({
        query: {
          orderBy: payload.orderBy,
        },
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
