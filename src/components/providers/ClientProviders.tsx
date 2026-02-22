"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "@/lib/api-setup";
import { Toaster } from "../ui/sonner";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 10 * 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      {children}
    </QueryClientProvider>
  );
}
