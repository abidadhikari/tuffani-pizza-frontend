"use client";
import { type ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/molecule/AppTable";
import AppPagination from "@/components/molecule/AppPagination";
import { ICommonTableProps } from "@/types/table";
import {
  TableActionCol,
  TableActionHeader,
} from "@/components/molecule/TableAction";
import StatusBadge from "@/components/atom/StatusBadge";
import { OperationLog } from "@/hooks/services/operation-logs/useGetOperationLogs";
import { formatDistanceToNow } from "date-fns";

interface IOperationLogsTableProps extends ICommonTableProps {
  data: OperationLog[];
  onActionClick?: (id: string) => void;
}

export default function OperationLogsTable({
  data,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalRecords,
  loading,
  onActionClick,
}: IOperationLogsTableProps) {
  const columns: ColumnDef<OperationLog>[] = [
    {
      accessorKey: "resource",
      header: "Resource",
      enableSorting: false,
      cell: ({ row }) => {
        const resource = row.original.resource;
        return (
          <span className="font-medium capitalize">
            {resource.toLowerCase().replace(/_/g, " ")}
          </span>
        );
      },
    },
    {
      accessorKey: "operation",
      header: "Operation",
      enableSorting: false,
      cell: ({ row }) => {
        const operation = row.original.operation;
        let variant: "success" | "error" | "warning" | "info" = "info";

        if (operation === "CREATE") variant = "success";
        else if (operation === "DELETE") variant = "error";
        else if (operation === "UPDATE") variant = "warning";

        return <StatusBadge label={operation} variant={variant} />;
      },
    },
    {
      accessorKey: "entityId",
      header: "Entity ID",
      enableSorting: false,
      cell: ({ row }) => {
        const entityId = row.original.entityId;
        return (
          <span className="text-sm text-gray-600 font-mono">
            {entityId?.substring(0, 8)}...
          </span>
        );
      },
    },
    {
      accessorKey: "performedBy.email",
      header: "Performed By",
      enableSorting: false,
      cell: ({ row }) => {
        const email =
          row.original.performedBy?.email || row.original.performedById;
        return <span className="text-sm">{email}</span>;
      },
    },
    {
      accessorKey: "performedBy.name",
      header: "Performer Email",
      enableSorting: false,
      cell: ({ row }) => {
        const name = row.original?.performedByEmail || "-";
        return <span className="text-sm">{name}</span>;
      },
    },
    // {
    //   accessorKey: "ipAddress",
    //   header: "IP Address",
    //   enableSorting: false,
    //   cell: ({ row }) => {
    //     const ip = row.original.ipAddress || "-";
    //     return <span className="text-sm font-mono">{ip}</span>;
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: "Timestamp",
      enableSorting: false,
      cell: ({ row }) => {
        const timestamp = row.original.createdAt || row.original.timestamp;
        if (!timestamp) return <span className="text-sm">-</span>;
        try {
          const date = new Date(timestamp);
          return (
            <span className="text-sm" title={date.toLocaleString()}>
              {formatDistanceToNow(date, { addSuffix: true })}
            </span>
          );
        } catch {
          return <span className="text-sm">{timestamp}</span>;
        }
      },
    },
    // {
    //   id: "action",
    //   enableSorting: false,
    //   header: () => <TableActionHeader />,
    //   cell: ({ row }) => {
    //     return (
    //       <TableActionCol
    //         onViewClick={() => onActionClick?.(row.original.id)}
    //       ></TableActionCol>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <AppTable
        columns={columns}
        data={data}
        loading={loading}
        onRowClick={(row) => {
          // Handle row click if needed
        }}
      />
      <AppPagination
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        totalRecords={totalRecords}
      />
    </>
  );
}
