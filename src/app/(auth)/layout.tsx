"use client";

import Button from "@/components/atom/Button";
import PageLoader from "@/components/atom/PageLoader";
import { useLogout } from "@/hooks/services/auth/useLogout";
import { useGetMe } from "@/hooks/services/users/useGetMe";
import { useAppSelector } from "@/store/storeHook";
import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const { user } = useAppSelector("auth");

  if (isLoading) {
    return <PageLoader />;
  }

  if (user) {
    return (
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        Already Logged in
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }
}
