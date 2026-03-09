// useGetMe.tsx

import {
  DashboardStatsDto,
  statsControllerGetDashboardStats,
  StatsControllerGetDashboardStatsResponse,
} from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "./queryKeys";

export const useGetDashboardStats = () => {
  const query = useQuery<DashboardStatsDto | undefined, Error>({
    queryKey: [queryKeys.DASHBOARD_STATS],
    queryFn: async () => {
      const { data } = await statsControllerGetDashboardStats({
        query: {
          startDate: new Date(
            new Date().setDate(new Date().getDate() - 7),
          ).toISOString(),
          endDate: new Date().toISOString(),
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
