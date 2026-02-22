"use client";
import { useGetDashboardStats } from "@/hooks/services/useGetDashboardStats";

export default function Page() {
  const { data, isLoading } = useGetDashboardStats();
  return (
    <div>
      <h1>Admin Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
