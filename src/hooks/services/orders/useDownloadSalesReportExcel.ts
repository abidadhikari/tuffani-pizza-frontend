"use client";

import {
  orderControllerDownloadSalesReportExcel,
  OrderControllerDownloadSalesReportExcelData,
} from "@/client";
import { QueryOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Payload = QueryOf<OrderControllerDownloadSalesReportExcelData>;

const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();

  anchor.remove();
  window.URL.revokeObjectURL(url);
};

export const useDownloadSalesReportExcel = () => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const response = await orderControllerDownloadSalesReportExcel({
        query: payload,
        responseType: "blob", // IMPORTANT
      });

      return response.data as Blob;
    },

    onSuccess: (blob) => {
      const now = new Date();
      const filename = `sales-report-${now.toISOString().slice(0, 10)}.xlsx`;

      downloadFile(blob, filename);

      toast.success("Sales report download started");
    },

    onError: () => {
      toast.error("Failed to download sales report");
    },
  });
};
