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
    },
    {
      accessorKey: "price",
      header: "Price",
      enableSorting: false,
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
