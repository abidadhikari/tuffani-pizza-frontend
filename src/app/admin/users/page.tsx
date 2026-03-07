"use client";
import { SiteHeader } from "@/components/site-header";
import { useGetMe } from "@/hooks/services/users/useGetMe";
import { useGetAllUsers } from "@/hooks/services/users/useGetAllUsers";
import React from "react";

export default function Users() {
  const { data, isLoading, isError } = useGetAllUsers();
  const { data: myData } = useGetMe();
  return (
    <div>
      <SiteHeader title="Users" />
      <pre>{JSON.stringify(myData, null, 2)}</pre>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching users.</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
