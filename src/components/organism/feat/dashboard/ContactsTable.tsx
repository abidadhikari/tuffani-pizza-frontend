"use client";
import { type ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/molecule/AppTable";
import AppPagination from "@/components/molecule/AppPagination";
import { ICommonTableProps } from "@/types/table";
import {
  TableActionCol,
  TableActionHeader,
} from "@/components/molecule/TableAction";
import { cn } from "@/lib/utils";
import { ContactResponseDto } from "@/client";
import Button from "@/components/atom/Button";

interface IContactsTableProps extends ICommonTableProps {
  data: ContactResponseDto[];
  onRowClick?: (row: ContactResponseDto) => void;
  currentRowId?: string;
  onActionClick?: (id: string) => void;
  onReadClick?: (row: ContactResponseDto) => void;
}

export default function ContactsTable({
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
}: IContactsTableProps) {
  const columns: ColumnDef<ContactResponseDto>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: false,
    },
    {
      accessorKey: "message",
      header: "Message",
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
      accessorKey: "isRead",
      header: "Read",
      cell: ({ row }) => {
        const isRead = row.original?.isRead;
        return (
          <div
            className={cn("  rounded-full p-1 text-center font-xs text-white", {
              "bg-green-500": row.original?.isRead,
              "bg-red-500": !row.original?.isRead,
            })}
          >
            {isRead ? "Read" : "Unread"}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: "action",
      enableSorting: false,
      header: () => <TableActionHeader />,

      cell: ({ row }) => {
        const isRead = row.original?.isRead;
        if (isRead) return null;
        return (
          <TableActionCol>
            <Button
              onClick={() => onReadClick?.(row.original)}
              variant={"ghost"}
              size={"sm"}
            >
              Mark as Read
            </Button>
          </TableActionCol>
        );
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
