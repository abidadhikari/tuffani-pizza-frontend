import { addonControllerFindAll } from "@/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryKeys } from "../queryKeys";

export interface AddonItem {
  id: string;
  name: string;
  price: number;
}

const normalizeAddonList = (payload: unknown): AddonItem[] => {
  if (!Array.isArray(payload)) return [];

  return payload
    .filter((entry): entry is Record<string, unknown> => {
      if (!entry || typeof entry !== "object") return false;
      return (
        typeof entry.id === "string" &&
        typeof entry.name === "string" &&
        (typeof entry.price === "number" || typeof entry.price === "string")
      );
    })
    .map((entry) => ({
      id: entry.id as string,
      name: entry.name as string,
      price: Number(entry.price),
    }));
};

export const useGetAllAddons = () => {
  const query = useQuery<AddonItem[] | undefined, Error>({
    queryKey: [queryKeys.ALL_ADDONS],
    queryFn: async () => {
      const { data } = await addonControllerFindAll();
      return normalizeAddonList(data);
    },
  });

  useEffect(() => {
    if (!query.isSuccess) return;
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (!query.isError) return;
  }, [query.isError]);

  return query;
};
