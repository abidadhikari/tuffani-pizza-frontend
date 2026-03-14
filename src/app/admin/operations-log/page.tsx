"use client";
import { SiteHeader } from "@/components/site-header";
import SearchBar from "@/components/molecule/SearchBar";
import AppSingleSelect from "@/components/molecule/AppSingleSelect";
import Button from "@/components/atom/Button";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useGetOperationLogs,
  OperationLog,
} from "@/hooks/services/operation-logs/useGetOperationLogs";
import OperationLogsTable from "@/components/organism/feat/dashboard/operation-logs/OperationLogsTable";
import OperationLogDetailModal from "@/components/organism/feat/dashboard/operation-logs/OperationLogDetailModal";

const RESOURCES = [
  { label: "All Resources", value: "#" },
  { label: "User", value: "USER" },
  { label: "Product", value: "PRODUCT" },
  { label: "Blog", value: "BLOG" },
  { label: "Category", value: "CATEGORY" },
  { label: "Offer", value: "OFFER" },
  { label: "Contact", value: "CONTACT" },
  { label: "Testimonial", value: "TESTIMONIAL" },
  { label: "Gallery", value: "GALLERY" },
  { label: "Order", value: "ORDER" },
  { label: "StaticContent", value: "STATICCONTENT" },
];

const OPERATIONS = [
  { label: "All Operations", value: "#" },
  { label: "CREATE", value: "CREATE" },
  { label: "READ", value: "READ" },
  { label: "UPDATE", value: "UPDATE" },
  { label: "DELETE", value: "DELETE" },
];

export default function OperationsLogPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [resource, setResource] = useState<string>("#");
  const [operation, setOperation] = useState<string>("#");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLog, setSelectedLog] = useState<OperationLog | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data, isLoading, refetch } = useGetOperationLogs({
    page: pageNo,
    limit: pageSize,
    search: debouncedSearch,
    resource: resource === "#" ? undefined : resource,
    operation: operation === "#" ? undefined : operation,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  useEffect(() => {
    if (search === debouncedSearch) return;

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPageNo(1);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search, debouncedSearch]);

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setResource("#");
    setOperation("#");
    setStartDate("");
    setEndDate("");
    setPageNo(1);
  };

  const hasActiveFilters =
    search !== "" ||
    resource !== "#" ||
    operation !== "#" ||
    startDate !== "" ||
    endDate !== "";

  const handleViewLog = (logId: string) => {
    const log = data?.data.find((l) => l.id === logId);
    if (log) {
      setSelectedLog(log);
      setIsDetailModalOpen(true);
    }
  };

  return (
    <div>
      <SiteHeader title="Operations Log">
        <Button
          variant="outline"
          size={"sm"}
          onClick={() => refetch()}
          disabled={isLoading}
        >
          <RotateCw className={isLoading ? "animate-spin" : ""} /> Refresh
        </Button>
      </SiteHeader>

      <div className="mb-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar
            placeholder="Search by email, resource, operation, or entity"
            value={search}
            onValueChange={setSearch}
            className="flex-1 "
          />
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="whitespace-nowrap"
            >
              Reset Filters
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <AppSingleSelect
            label="Resource : "
            data={RESOURCES}
            value={resource}
            onChange={(value: string) => {
              setResource(value);
              setPageNo(1);
            }}
            placeholder="Filter by resource"
            className="w-48"
          />
          <AppSingleSelect
            label="Operation : "
            data={OPERATIONS}
            value={operation}
            onChange={(value: string) => {
              setOperation(value);
              setPageNo(1);
            }}
            placeholder="Filter by operation"
            className="w-48"
          />

          <div className="flex items-end gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPageNo(1);
                }}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPageNo(1);
                }}
                className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <OperationLogsTable
        data={data?.data || []}
        loading={isLoading}
        pageNumber={pageNo}
        pageSize={pageSize}
        onPageChange={setPageNo}
        onPageSizeChange={setPageSize}
        totalRecords={data?.meta?.total || 0}
        onActionClick={handleViewLog}
      />

      <OperationLogDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        log={selectedLog}
      />
    </div>
  );
}
