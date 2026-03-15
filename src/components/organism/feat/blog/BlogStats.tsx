"use client";

import { ArrowDown, Eye } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BlogsStatsResponseDto } from "@/client";

interface Props {
  data?: BlogsStatsResponseDto[];
  orderBy: string;
  setOrderBy: (value: string) => void;
}

export default function BlogStats({ data, orderBy, setOrderBy }: Props) {
  const filters = [
    { label: "Views", value: "views" },
    { label: "Created", value: "createdAt" },
    { label: "Updated", value: "updatedAt" },
  ];

  return (
    <div className="mt-8 rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-lg font-semibold">Top Blogs</h2>

        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setOrderBy(f.value)}
              className={cn(
                "flex items-center gap-1 rounded-md border px-3 py-1 text-sm transition cursor-pointer",
                orderBy === f.value
                  ? "bg-brand text-white"
                  : "bg-white hover:bg-gray-100",
              )}
            >
              {f.label}
              {orderBy === f.value && <ArrowDown size={14} />}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y">
        {data?.map((blog: BlogsStatsResponseDto, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
          >
            <div className="flex flex-col">
              <span className="font-medium">{blog.title}</span>
              {/* <span className="text-sm text-muted-foreground">
                {blog?.slug}
              </span> */}

              <div className="flex gap-5 py-1">
                <span className="text-xs text-muted-foreground">
                  Created At :{" "}
                  <>
                    {blog?.createdAt
                      ? format(new Date(blog?.createdAt), "PPP")
                      : null}
                  </>
                </span>
                <span className="text-xs text-muted-foreground">
                  Updated At :{" "}
                  <>
                    {blog?.updatedAt
                      ? format(new Date(blog?.updatedAt), "PPP")
                      : null}
                  </>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Views */}
              <div className="flex items-center gap-1 text-sm">
                <Eye size={16} />
                <span className="font-medium">{blog?.views ?? "-"}</span>
              </div>

              {/* Visibility */}
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  blog.isVisible
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600",
                )}
              >
                {blog.isVisible ? "Visible" : "Hidden"}
              </span>
            </div>
          </div>
        ))}

        {!data?.length && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No blog data
          </div>
        )}
      </div>
    </div>
  );
}
