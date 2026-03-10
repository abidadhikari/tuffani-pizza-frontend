import { PageGuard } from "@/components/organism/feat/auth/PageGuard";
import { ROLES } from "@/lib/constants";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <PageGuard allowedRoles={[ROLES.SUPER_ADMIN]}>{children}</PageGuard>
    </>
  );
}
