"use client";
import { RoleGuard } from "@/components/organism/feat/auth/RoleGuard";
import { ROLES } from "@/lib/constants";
import { Text } from "lucide-react";

export default function OperationsLogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard
      allowedRoles={[ROLES.SUPER_ADMIN]}
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-600">
              You do not have permission to access this page. Only Super Admins
              can view the Operations Log.
            </p>
          </div>
        </div>
      }
    >
      {children}
    </RoleGuard>
  );
}
