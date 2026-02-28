"use client";
import { type ColumnDef } from "@tanstack/react-table";
import AppTable from "@/components/molecule/AppTable";
import { ICommonTableProps } from "@/types/table";
import {
  TableActionCol,
  TableActionHeader,
} from "@/components/molecule/TableAction";
import { cn } from "@/lib/utils";
import { TestimonialResponseDto } from "@/client";
import Button from "@/components/atom/Button";
import { Edit, EyeIcon, EyeOff } from "lucide-react";

export type ITestimonialTableType = TestimonialResponseDto;

interface ITestimonialTableProps extends ICommonTableProps {
  data: ITestimonialTableType[];
  onRowClick?: (row: ITestimonialTableType) => void;
  currentRowId?: string;
  onActionClick?: (id: string) => void;
  onEditButtonClick: (id: string) => void;
  onEyeButtonClick: (id: string, value: boolean) => void;
}

export default function TestimonialTable({
  data,
  onRowClick,
  pageNumber,
  pageSize,
  loading,
  onEditButtonClick,
  onEyeButtonClick,
}: ITestimonialTableProps) {
  const columns: ColumnDef<ITestimonialTableType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: false,
    },
    {
      accessorKey: "designation",
      header: "Designation",
      enableSorting: false,
    },
    {
      accessorKey: "testimonial",
      header: "Testimonial",
      enableSorting: false,
    },

    {
      accessorKey: "visible",
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
      id: "action",
      enableSorting: false,
      header: () => <TableActionHeader />,

      cell: ({ row }) => {
        return (
          <TableActionCol>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onEyeButtonClick(row.original.id, !row.original.isVisible);
              }}
            >
              {row.original.isVisible ? <EyeOff /> : <EyeIcon />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onEditButtonClick?.(row.original.id);
              }}
            >
              <Edit />
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

      {/* <AppPagination
        currentPage={pageNumber}
        totalItems={totalRecords}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelector
        showPageInfo
      /> */}
    </>
  );
}
