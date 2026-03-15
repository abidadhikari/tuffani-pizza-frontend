import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  currentPage?: number;
  isSelectableTableDesign?: boolean;
  loading?: boolean;
  totalItems?: number;
  isStatic?: boolean;
  defaultSorting?: SortingState;
  onSortChange?: (sortBy: {
    columnId: string | null;
    direction: "asc" | "desc" | null;
  }) => void;
  onRowClick?: (row: TData) => void;
}

export default function AppTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  loading = false,
  currentPage,
  isStatic,
  defaultSorting = [],
  onSortChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage && isStatic ? currentPage - 1 : 0,
        pageSize,
      },
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);

      if (onSortChange) {
        if (newSorting.length > 0) {
          const { id, desc } = newSorting[0];
          onSortChange({
            columnId: id,
            direction: desc ? "desc" : "asc",
          });
        } else {
          onSortChange({ columnId: null, direction: null });
        }
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full overflow-auto  border rounded-md">
      <Table className="overflow-hidden bg-white rounded-md ">
        <TableHeader className="font-extrabold bg-white2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort();

                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "text-sm py-4 select-none rounded-none! transition-colors bg-gray-200",
                      // isSortable ? "cursor-pointer hover:bg-gray-100" : ""
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2 font-semibold">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {isSortable && (
                          <span className="text-gray-400">
                            {{
                              asc: <ArrowUp className="size-4 text-primary" />,
                              desc: (
                                <ArrowDown className="size-4 text-primary" />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <ArrowUpDown className="size-4 opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const rowId = row.id;
              const isSelected = !!rowSelection[rowId];

              return (
                <TableRow
                  key={rowId}
                  data-state={isSelected ? "selected" : undefined}
                  className={cn("group", {
                    "cursor-pointer": onRowClick,
                  })}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (
                      target.closest(
                        "button, a, input, select, textarea, [role='button']",
                      )
                    ) {
                      return;
                    }
                    onRowClick?.(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const stickyClass =
                      cell.column.id === "sticky-left"
                        ? "relative md:sticky left-0 z-10 bg-white"
                        : cell.column.id === "sticky-right"
                          ? "relative md:sticky right-0 z-10 bg-white"
                          : "";

                    return (
                      <TableCell
                        key={cell.id}
                        className={`py-5 group-hover:bg-white2 ease-in-out ${stickyClass}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : loading ? (
            [...Array(pageSize)].map((_, idx) => (
              <TableRow key={idx}>
                {columns.map((col, index: number) => (
                  <TableCell
                    key={index}
                    className="h-15 bg-gray-100 animate-pulse"
                  >
                    &nbsp;
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="text-gray-500">No data available</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
