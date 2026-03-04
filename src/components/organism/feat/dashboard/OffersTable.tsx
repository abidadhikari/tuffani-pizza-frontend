"use client";
import { type ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/molecule/AppTable";
import { ICommonTableProps } from "@/types/table";
import {
  TableActionCol,
  TableActionHeader,
} from "@/components/molecule/TableAction";
import { cn } from "@/lib/utils";
import { OfferResponseDto } from "@/client";
import Button from "@/components/atom/Button";
import { Edit, Eye, EyeClosed, EyeOffIcon, Trash2 } from "lucide-react";
import { extractTime, extractTime12Hour } from "@/lib/date-time";

export type IOffersTableType = OfferResponseDto;

interface IOffersTableProps extends ICommonTableProps {
  data: IOffersTableType[];
  onRowClick?: (row: IOffersTableType) => void;
  currentRowId?: string;
  onActionClick?: (id: string) => void;
  onEyeClick?: (id: string, isActive: boolean) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
}

export default function OffersTable({
  data,
  onRowClick,
  pageNumber,
  pageSize,
  loading,
  onEyeClick,
  onActionClick,
  onEditClick,
  onDeleteClick,
}: IOffersTableProps) {
  const columns: ColumnDef<IOffersTableType>[] = [
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
      accessorKey: "discountType",
      header: "Discount Type",
      enableSorting: false,
    },

    {
      accessorKey: "discountValue",
      header: "Discount Value",
      enableSorting: false,
    },

    {
      accessorKey: "validFrom",
      header: "Valid From",
      cell: ({ row }) => {
        return new Date(row.original.validFrom).toLocaleDateString();
      },
      enableSorting: false,
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => {
        return new Date(row.original.validUntil).toLocaleDateString();
      },
      enableSorting: false,
    },
    {
      accessorKey: "startsAt",
      header: "Starts At",
      cell: ({ row }) => {
        return extractTime12Hour(row.original.startsAt);
      },
      enableSorting: false,
    },
    {
      accessorKey: "endsAt",
      header: "Ends At",
      cell: ({ row }) => {
        return extractTime12Hour(row.original.endsAt);
      },
      enableSorting: false,
    },
    {
      accessorKey: "daysOfWeek",
      header: "Days of Week",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-1">
            {row.original?.daysOfWeek?.map((day) => (
              <div
                key={day}
                className="text-xs bg-gray-200 rounded-full px-2 py-1"
              >
                {day}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "isVisible",
      header: "Visible",
      cell: ({ row }) => {
        const isVisible = row.original.isVisible;
        return (
          <div
            className={cn("size-4  rounded-full", {
              "bg-green-500": isVisible,
              "bg-red-500": !isVisible,
            })}
          ></div>
        );
      },
      enableSorting: false,
    },
    // {
    //   accessorKey: "createdAt",
    //   header: "Created At",
    //   cell: ({ row }) => {
    //     return new Date(row.original.createdAt).toLocaleDateString();
    //   },
    //   enableSorting: false,
    // },
    // {
    //   accessorKey: "updatedAt",
    //   header: "Updated At",
    //   cell: ({ row }) => {
    //     return new Date(row.original.updatedAt).toLocaleDateString();
    //   },
    //   enableSorting: false,
    // },
    {
      id: "action",
      enableSorting: false,
      header: () => <TableActionHeader />,

      cell: ({ row }) => {
        return (
          <TableActionCol>
            <Button
              variant={"ghost"}
              onClick={() =>
                onEyeClick &&
                onEyeClick(row.original.id, !row.original.isVisible)
              }
            >
              {!row.original.isVisible ? <Eye /> : <EyeOffIcon />}
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => onEditClick && onEditClick(row.original.id)}
            >
              <Edit />
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => onDeleteClick && onDeleteClick(row.original.id)}
            >
              <Trash2 />
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
    </>
  );
}
