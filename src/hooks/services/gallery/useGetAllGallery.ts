// useGetMe.tsx

import { staticContentControllerFindAllGalleryItems } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetAllGallery = () => {
  const query = useQuery({
    queryKey: [queryKeys.ALL_GALLERY],
    queryFn: async () => {
      const { data } = await staticContentControllerFindAllGalleryItems();
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
