"use client";

import Button from "@/components/atom/Button";
import AppSingleSelect from "@/components/molecule/AppSingleSelect";
import SearchBar from "@/components/molecule/SearchBar";
import ProductsTable, {
  IProductsTableType,
} from "@/components/organism/feat/dashboard/ProductsTable";
import { SiteHeader } from "@/components/site-header";
import { useGetAllProducts } from "@/hooks/services/products/useGetAllProducts";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isVisible, setIsVisible] = useState<"true" | "false" | "#">("#");

  const { data, isLoading } = useGetAllProducts({
    page: pageNo,
    limit: pageSize,
    search: debouncedSearch,
    visible: isVisible === "#" ? undefined : isVisible,
  });

  useEffect(() => {
    if (search === debouncedSearch) return;

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  return (
    <div>
      <SiteHeader title="Products">
        <Link href="/admin/products/create">
          <Button variant="default" size={"sm"}>
            <Plus /> Create New
          </Button>
        </Link>
      </SiteHeader>

      <div className="mb-5 flex items-center justify-between">
        <SearchBar
          placeholder="Search blogs..."
          value={search}
          onValueChange={setSearch}
        />
        <AppSingleSelect
          label="Visibility : "
          data={[
            { label: "All", value: "#" },
            { label: "Visible", value: "true" },
            { label: "Hidden", value: "false" },
          ]}
          value={isVisible}
          onChange={(value: string) => {
            setIsVisible(value as "true" | "false" | "#");
          }}
          placeholder="Filter by visibility"
          className="w-48 mt-3"
        />
      </div>

      <ProductsTable
        data={(data?.data as IProductsTableType[]) || []}
        pageNumber={pageNo}
        pageSize={pageSize}
        onPageChange={setPageNo}
        onPageSizeChange={setPageSize}
        totalRecords={data?.meta?.total || 0}
        loading={isLoading}
      />
    </div>
  );
}
