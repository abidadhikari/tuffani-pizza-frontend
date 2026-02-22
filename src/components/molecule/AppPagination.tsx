"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export default function AppPagination({
  currentPage,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = false,
  showPageInfo = false,
  showFirstLast = false,
  maxVisiblePages = 5,
  className = "",
}: AppPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }
    if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const size = Number.parseInt(newPageSize);
    if (onPageSizeChange) {
      onPageSizeChange(size);
      const newTotalPages = Math.ceil(totalItems / size);
      if (currentPage > newTotalPages) {
        onPageChange(1);
      }
    }
  };

  return (
    <div
      className={cn(
        `flex flex-col items-center sm:flex-row gap-3 mt-4  ${className}`,
      )}
    >
      {/* Page Info */}
      {showPageInfo && (
        <>
          {startItem && endItem && totalItems ? (
            <div className="text-sm text-muted-foreground whitespace-nowrap">
              Showing {startItem} to {endItem} of {totalItems} results
            </div>
          ) : (
            <div></div>
          )}
        </>
      )}

      {/* Pagination Controls */}
      {totalPages >= 1 ? (
        <Pagination className="relative">
          <PaginationContent>
            {showFirstLast && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="size-8 rounded-sm p-0"
              >
                <ChevronFirst className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
            )}

            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "rounded-md px-2 py-1 transition-colors",
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50 dark:text-gray-300"
                    : "cursor-pointer hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300",
                )}
              />
            </PaginationItem>

            {visiblePages.map((page, index) => (
              <PaginationItem key={index}>
                {typeof page === "number" ? (
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                    className={cn(
                      "cursor-pointer size-8 rounded-md transition-colors",
                      // Light mode
                      page === currentPage
                        ? "border-2 border-gray-300/40 bg-white text-black"
                        : "hover:bg-gray-100 text-gray-700",
                      // Dark mode
                      page === currentPage
                        ? "dark:bg-white dark:text-black dark:border-gray-600"
                        : "dark:hover:bg-gray-700 dark:text-white",
                    )}
                  >
                    {page}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  "rounded-md px-2 py-1 transition-colors",
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50 dark:text-gray-300"
                    : "cursor-pointer hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300",
                )}
              />
            </PaginationItem>

            {showFirstLast && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="size-8 rounded-sm p-0"
                >
                  <ChevronLast className="h-4 w-4" />
                  <span className="sr-only">Last page</span>
                </Button>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      ) : (
        <div className="w-full">
          {/* This div is added to act as invisible spacer when no pagination is loaded  */}
        </div>
      )}

      {/* Page Size Selector */}
      {showPageSizeSelector && totalItems > 0 && (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-fit cursor-pointer  px-2  ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">per page</span>
        </div>
      )}
    </div>
  );
}
