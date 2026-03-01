"use client";

import {
  blogControllerFindOne,
  BlogControllerFindOneData,
  BlogResponseDto,
} from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { PathOf } from "@/types/client-service.type";

type Payload = PathOf<BlogControllerFindOneData>;

export const useGetBlogById = (payload: Payload) => {
  const query = useQuery<BlogResponseDto | undefined, Error>({
    queryKey: [queryKeys.SINGLE_BLOG, payload.id],
    queryFn: async () => {
      const { data } = await blogControllerFindOne({
        path: payload,
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
