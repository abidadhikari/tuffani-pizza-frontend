"use client";
import { useGetDashboardStats } from "@/hooks/services/useGetDashboardStats";
import { useAppSelector } from "@/store/storeHook";

export default function Page() {
  const { data, isLoading } = useGetDashboardStats();
  const authSlice = useAppSelector("auth");
  return (
    <div>
      <h1>Admin Page</h1>
      <pre>{JSON.stringify(authSlice, null, 2)}</pre>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
