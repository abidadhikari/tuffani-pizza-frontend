import AuthGuard from "@/components/layout/AuthGuard";
import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
