"use client";

import {
  orderControllerDownloadSalesReportExcel,
  OrderControllerDownloadSalesReportExcelData,
} from "@/client";
import { QueryOf } from "@/types/client-service.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Payload = QueryOf<OrderControllerDownloadSalesReportExcelData>;

const toBlob = (data: unknown) => {
  if (data instanceof Blob) {
    return data;
  }

  if (data instanceof ArrayBuffer) {
    return new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  }

  if (typeof data === "string") {
    return new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  }

  return new Blob([JSON.stringify(data)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
};

const triggerDownload = (blob: Blob, filename: string) => {
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
      const { data } = await orderControllerDownloadSalesReportExcel({
        query: payload,
      });
      return data;
    },
    onSuccess: (data) => {
      const now = new Date();
      const filename = `sales-report-${now.toISOString().slice(0, 10)}.xlsx`;
      const blob = toBlob(data);
      triggerDownload(blob, filename);
      toast.success("Sales report download started");
    },
    onError: () => {
      toast.error("Failed to download sales report");
    },
  });
};
