import {
  operationLogControllerFindAll,
  OperationLogControllerFindAllData,
} from "@/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryKeys } from "../queryKeys";
import { QueryOf } from "@/types/client-service.type";

type QueryType = QueryOf<OperationLogControllerFindAllData>;

export interface OperationLog {
  id: string;
  resource: string;
  operation: string;
  entityId: string;
  performedBy?: {
    id: string;
    email: string;
    name: string;
  };
  performedById: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  timestamp: string;
}

export interface PaginatedOperationLogResponse {
  data: OperationLog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useGetOperationLogs = (payload: QueryType) => {
  const query = useQuery<PaginatedOperationLogResponse | undefined, Error>({
    queryKey: [
      ...queryKeys.OPERATION_LOGS,
      payload.page,
      payload.limit,
      payload.search,
      payload.resource,
      payload.operation,
      payload.performedById,
      payload.startDate,
      payload.endDate,
    ],
    queryFn: async () => {
      const { data } = await operationLogControllerFindAll({
        query: payload,
      });
      return data as PaginatedOperationLogResponse;
    },
  });

  useEffect(() => {
    if (!query.isSuccess) return;

    if (query.data) {
      // Add any side effects here if needed
    }
  }, [query.isSuccess, query.data]);

  return query;
};
