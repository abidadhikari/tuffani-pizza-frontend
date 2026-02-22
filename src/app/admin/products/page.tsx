"use client";

import Button from "@/components/atom/Button";
import ProductsTable, {
  IProductsTableType,
} from "@/components/organism/feat/dashboard/ProductsTable";
import { SiteHeader } from "@/components/site-header";
import { useGetAllProducts } from "@/hooks/services/products/useGetAllProducts";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductsPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useGetAllProducts();
  return (
    <div>
      <SiteHeader title="Products">
        <Link href="/admin/products/create">
          <Button variant="default" size={"sm"}>
            <Plus /> Create New
          </Button>
        </Link>
      </SiteHeader>
      <div></div>
      {isLoading ? <p>Loading...</p> : <></>}
      <ProductsTable
        data={(data as IProductsTableType[]) || []}
        pageNumber={pageNo}
        pageSize={pageSize}
        onPageChange={setPageNo}
        onPageSizeChange={setPageSize}
        totalRecords={0}
        loading={isLoading}
      />
    </div>
  );
}
