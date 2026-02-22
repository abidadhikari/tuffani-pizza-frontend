// useGetMe.tsx

import { statsControllerGetDashboardStats } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "./queryKeys";

export const useGetDashboardStats = () => {
  const query = useQuery<unknown | undefined, Error>({
    queryKey: [queryKeys.DASHBOARD_STATS],
    queryFn: async () => {
      const { data } = await statsControllerGetDashboardStats();
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
