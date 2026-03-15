"use client";

import { useAppSelector } from "@/store/storeHook";
import { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  disallowedRoles?: string[];
  fallback?: ReactNode;
  showFallback?: boolean;
}

export function RoleGuard({
  children,
  allowedRoles = [],
  disallowedRoles = [],
  fallback = null,
  showFallback = true,
}: RoleGuardProps) {
  const { user } = useAppSelector("auth");

  const hasRole = (roles: string[]) => {
    if (!user || !user.role) return false;
    if (roles.length === 0) return true;
    return roles.some((role) => role === user.role);
  };

  if (!user) {
    return showFallback ? <>{fallback}</> : null;
  }
  if (!hasRole(allowedRoles)) {
    return showFallback ? <>{fallback}</> : null;
  }
  if (disallowedRoles.length) {
    if (hasRole(disallowedRoles)) {
      return showFallback ? <>{fallback}</> : null;
    }
  }
  return <>{children}</>;
}
