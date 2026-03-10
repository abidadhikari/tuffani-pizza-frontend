"use client";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useGetMe } from "@/hooks/services/users/useGetMe";

interface PageGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  disallowedRoles?: string[];
}

export function PageGuard({
  children,
  allowedRoles = [],
  disallowedRoles = [],
}: PageGuardProps) {
  const { data, isLoading, isError } = useGetMe();

  const hasRole = (roles: string[]) => {
    if (!data || !data.role) return false;
    if (roles.length === 0) return true;
    return roles.some((role) => data.role === role);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-2">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-2">
        Something went wrong.
      </div>
    );
  }

  if (!data) {
    return redirect("/unauthorized");
  }
  if (!hasRole(allowedRoles)) {
    return redirect("/unauthorized");
  }
  if (disallowedRoles.length)
    if (hasRole(disallowedRoles)) {
      return redirect("/unauthorized");
    }
  return <>{children}</>;
}
