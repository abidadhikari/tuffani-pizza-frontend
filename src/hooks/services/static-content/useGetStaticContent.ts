// useGetMe.tsx

import { staticContentControllerFindAll } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";

export const useGetStaticContent = () => {
  const query = useQuery<unknown | undefined, Error>({
    queryKey: ["static-content"],
    queryFn: async () => {
      const { data } = await staticContentControllerFindAll();
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
