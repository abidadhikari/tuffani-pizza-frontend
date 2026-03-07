"use client";
import { AppSidebar } from "@/components/app-sidebar";
import PageLoader from "@/components/atom/PageLoader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useGetMe } from "@/hooks/services/users/useGetMe";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useGetMe();
  if (isLoading) {
    return <PageLoader />;
  }

  if (data?.role !== "ADMIN" && data?.role !== "SUPER_ADMIN") {
    return <div>Unauthorized</div>;
  }
  return (
    <div className={dmSans.variable}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
        className={`${dmSans.variable}`}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2 px-4">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
