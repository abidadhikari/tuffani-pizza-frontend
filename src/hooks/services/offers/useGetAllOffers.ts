// useGetMe.tsx

import { offerControllerFindAll, OfferResponseDto } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetAllOffers = () => {
  const query = useQuery<OfferResponseDto[] | undefined, Error>({
    queryKey: [queryKeys.ALL_OFFERS],
    queryFn: async () => {
      const { data } = await offerControllerFindAll();
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
