"use client";

import Button from "@/components/atom/Button";
import BlogsTable, {
  IBlogsTableType,
} from "@/components/organism/feat/dashboard/BlogsTable";
import { SiteHeader } from "@/components/site-header";
import { useGetAllBlogs } from "@/hooks/services/blogs/useGetAllBlogs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogsPage() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useGetAllBlogs();
  return (
    <div>
      <SiteHeader title="Blogs">
        <Link href="/admin/blogs/create">
          <Button variant="default" size={"sm"}>
            <Plus /> Create New
          </Button>
        </Link>
      </SiteHeader>

      <BlogsTable
        data={(data as IBlogsTableType[]) || []}
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
