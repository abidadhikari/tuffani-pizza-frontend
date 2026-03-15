"use client";

import PageLoader from "@/components/atom/PageLoader";
import { useGetMe } from "@/hooks/services/users/useGetMe";
import { useAppSelector } from "@/store/storeHook";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { data, isLoading } = useGetMe();
  const { user } = useAppSelector("auth");
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && !data) {
      router.replace("/login");
    }
  }, [isLoading, user, router, data]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
