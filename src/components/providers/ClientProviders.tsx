"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "@/lib/api-setup";
import { Toaster } from "../ui/sonner";
import { Provider } from "react-redux";
import { store } from "@/store";
import { CartProvider } from "./CartProvider";

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
  console.log(process.env);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Toaster position="top-right" visibleToasts={1} richColors />
          {children}
        </CartProvider>
      </QueryClientProvider>
    </Provider>
  );
}
