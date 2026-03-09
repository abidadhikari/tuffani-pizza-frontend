"use client";
import { type ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/molecule/AppTable";
import AppPagination from "@/components/molecule/AppPagination";
import { ICommonTableProps } from "@/types/table";
import {
  TableActionCol,
  TableActionHeader,
} from "@/components/molecule/TableAction";

import { BaseUserResponseDto } from "@/client";
import StatusBadge from "@/components/atom/StatusBadge";

interface IUsersTableProps extends ICommonTableProps {
  data: BaseUserResponseDto[];
  onRowClick?: (row: BaseUserResponseDto) => void;
  currentRowId?: string;
  onActionClick?: (id: string) => void;
  onReadClick?: (row: BaseUserResponseDto) => void;
}

export default function UsersTable({
  data,
  onRowClick,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalRecords,
  loading,
  currentRowId,
  onActionClick,
  onReadClick,
}: IUsersTableProps) {
  const columns: ColumnDef<BaseUserResponseDto>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: false,
    },

    {
      accessorKey: "email",
      header: "Email",
      enableSorting: false,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      enableSorting: false,
    },
    {
      accessorKey: "isVerified",
      header: "Verified",
      enableSorting: false,
      cell: ({ row }) => {
        const isVerified = row.original.isVerified;
        return (
          <StatusBadge
            label={isVerified ? "Verified" : "Not Verified"}
            variant={isVerified ? "success" : "error"}
          />
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <StatusBadge
            label={status}
            variant={status === "ACTIVE" ? "success" : undefined}
          />
        );
      },
    },

    {
      id: "action",
      enableSorting: false,
      header: () => <TableActionHeader />,

      cell: ({ row }) => {
        const isRead = true;

        return <TableActionCol></TableActionCol>;
      },
    },
  ];

  return (
    <>
      <div className="overflow-auto">
        <AppTable
          columns={columns}
          data={data}
          pageSize={pageSize}
          currentPage={pageNumber}
          loading={loading}
          onRowClick={onRowClick}
        />
      </div>
      <AppPagination
        currentPage={pageNumber}
        totalItems={totalRecords}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelector
        showPageInfo
      />
    </>
  );
}
