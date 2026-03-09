"use client";
import { SiteHeader } from "@/components/site-header";
import { useGetAllUsers } from "@/hooks/services/users/useGetAllUsers";
import React, { useEffect, useState } from "react";
import UsersTable from "@/components/organism/feat/dashboard/UsersTable";
import SearchBar from "@/components/molecule/SearchBar";
import AppSingleSelect from "@/components/molecule/AppSingleSelect";

export default function Users() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isVerified, setIsVerified] = useState<"true" | "false" | "#">("#");
  const [role, setRole] = useState<"ADMIN" | "USER" | "SUPER_ADMIN" | "#">("#");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE" | "BANNED" | "#">(
    "#",
  );

  const { data, isLoading } = useGetAllUsers({
    page: pageNo,
    limit: pageSize,
    search: debouncedSearch,
    isVerified: isVerified === "#" ? undefined : isVerified,
    role: role === "#" ? undefined : role,
    status: status === "#" ? undefined : status,
  });

  useEffect(() => {
    if (search === debouncedSearch) return;

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <div>
      <SiteHeader title="Users" />
      <div className="mb-5 flex items-center justify-between">
        <SearchBar
          placeholder="Search blogs..."
          value={search}
          onValueChange={setSearch}
        />
        <div className="flex items-center gap-4">
          <AppSingleSelect
            label="Verification : "
            data={[
              { label: "All", value: "#" },
              { label: "Verified", value: "true" },
              { label: "Not Verified", value: "false" },
            ]}
            value={isVerified}
            onChange={(value: string) => {
              setIsVerified(value as "true" | "false" | "#");
            }}
            placeholder="Filter by verification"
            className="w-48 mt-3"
          />
          <AppSingleSelect
            label="Role : "
            data={[
              { label: "All", value: "#" },
              { label: "User", value: "USER" },
              { label: "Admin", value: "ADMIN" },

              { label: "Super Admin", value: "SUPER_ADMIN" },
            ]}
            value={role}
            onChange={(value: string) => {
              setRole(value as "ADMIN" | "USER" | "SUPER_ADMIN" | "#");
            }}
            placeholder="Filter by role"
            className="w-48 mt-3"
          />
          <AppSingleSelect
            label="Status : "
            data={[
              { label: "All", value: "#" },
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
              { label: "Banned", value: "BANNED" },
            ]}
            value={status}
            onChange={(value: string) => {
              setStatus(value as "ACTIVE" | "INACTIVE" | "BANNED" | "#");
            }}
            placeholder="Filter by status"
            className="w-48 mt-3"
          />
        </div>
      </div>
      <UsersTable
        data={data?.data || []}
        loading={isLoading}
        pageNumber={pageNo}
        pageSize={pageSize}
        onPageChange={setPageNo}
        onPageSizeChange={setPageSize}
        totalRecords={data?.meta?.total || 0}
      />
    </div>
  );
}
