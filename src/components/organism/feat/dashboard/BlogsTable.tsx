"use client";
import { type ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/molecule/AppTable";
import { ICommonTableProps } from "@/types/table";
import {
  TableActionCol,
  TableActionHeader,
} from "@/components/molecule/TableAction";
import { cn } from "@/lib/utils";
import { BlogResponseDto } from "@/client";
import AppPagination from "@/components/molecule/AppPagination";

export type IBlogsTableType = BlogResponseDto;

interface IBlogsTableProps extends ICommonTableProps {
  data: IBlogsTableType[];
  onRowClick?: (row: IBlogsTableType) => void;
  currentRowId?: string;
  onActionClick?: (id: string) => void;
}

export default function BlogsTable({
  data,
  onRowClick,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalRecords,
  loading,
}: IBlogsTableProps) {
  const columns: ColumnDef<IBlogsTableType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: false,
    },
    {
      accessorKey: "description",
      header: "Description",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="max-w-75 truncate" title={row.original.description}>
            {row.original.description}
          </div>
        );
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      enableSorting: false,
      cell: ({ row }) => {
        return row.original?.author?.name;
      },
    },

    {
      accessorKey: "isVisible",
      header: "Visible",
      cell: ({ row }) => {
        return (
          <div
            className={cn("size-4  rounded-full", {
              "bg-green-500": row.original?.isVisible,
              "bg-red-500": !row.original?.isVisible,
            })}
          ></div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString();
      },
      enableSorting: false,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        return new Date(row.original.updatedAt).toLocaleDateString();
      },
      enableSorting: false,
    },
    {
      id: "action",
      enableSorting: false,
      header: () => <TableActionHeader />,

      cell: ({ row }) => {
        return (
          <TableActionCol
            navigateTo={`/admin/blogs/${row.original?.id}`}
          ></TableActionCol>
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
        <AppPagination
          currentPage={pageNumber}
          totalItems={totalRecords}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showPageSizeSelector
          showPageInfo
        />
      </div>
    </>
  );
}
