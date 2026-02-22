// useGetMe.tsx

import { userControllerFindUserById } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";

export const useGetMe = () => {
  const query = useQuery<unknown | undefined, Error>({
    queryKey: ["get-me"],
    queryFn: async () => {
      const { data } = await userControllerFindUserById();
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
