import { testimonialControllerFindAll, TestimonialResponseDto } from "@/client";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export const useGetAllTestimonials = () => {
  const query = useQuery<TestimonialResponseDto[] | undefined, Error>({
    queryKey: [queryKeys.ALL_TESTIMONIALS],
    queryFn: async () => {
      const { data } = await testimonialControllerFindAll();
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
