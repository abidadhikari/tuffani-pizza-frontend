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

export interface IProductsTableType {
  id: string | null;
  name: string | null;
  description: string;
  price: number | string | null;
  crossedPrice: number | string | null;
  variants?: Array<{
    size: "SMALL" | "MEDIUM" | "LARGE";
    price: number;
    crossedPrice?: number | null;
  }>;
  visible: boolean;
  type: string | null;
  category: {
    id: string;
    name: string;
  } | null;
}

interface IProductsTableProps extends ICommonTableProps {
  data: IProductsTableType[];
  onRowClick?: (row: IProductsTableType) => void;
  currentRowId?: string;
  onActionClick?: (id: string) => void;
}

export default function ProductsTable({
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
}: IProductsTableProps) {
  const columns: ColumnDef<IProductsTableType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: false,
    },
    {
      accessorKey: "description",
      header: "Description",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div
            className="max-w-75 truncate"
            title={row.original.description || undefined}
          >
            {row.original.description || "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      enableSorting: false,
      cell: ({ row }) => {
        const variants = (row.original.variants ?? []).filter(
          (variant) => Number(variant.price) > 0,
        );

        if (variants.length === 0) {
          return row.original.price ?? "-";
        }

        const order: Record<"SMALL" | "MEDIUM" | "LARGE", number> = {
          SMALL: 1,
          MEDIUM: 2,
          LARGE: 3,
        };
        const labels: Record<"SMALL" | "MEDIUM" | "LARGE", string> = {
          SMALL: "S",
          MEDIUM: "M",
          LARGE: "L",
        };

        return (
          <div className="text-xs text-slate-700">
            {variants
              .sort((a, b) => order[a.size] - order[b.size])
              .map((variant) => (
                <div key={variant.size}>
                  {labels[variant.size]}: Rs.{variant.price}
                </div>
              ))}
          </div>
        );
      },
    },
    {
      accessorKey: "crossedPrice",
      header: "Crossed Price",
      enableSorting: false,
    },
    {
      accessorKey: "type",
      header: "Type",
      enableSorting: false,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        return row.original?.category?.name || "-";
      },
      enableSorting: false,
    },
    {
      accessorKey: "visible",
      header: "Visible",
      cell: ({ row }) => {
        return (
          <div
            className={cn("size-4  rounded-full", {
              "bg-green-500": row.original?.visible,
              "bg-red-500": !row.original?.visible,
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
          <TableActionCol navigateTo={`/admin/products/${row.original?.id}`}>
            {/* <Link
              href={`/organization-management/${row.original.organization_id}/edit`}
            >
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Edit />
              </Button>
            </Link> */}
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
