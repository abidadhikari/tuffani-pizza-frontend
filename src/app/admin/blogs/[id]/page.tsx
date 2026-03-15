"use client";
import CreateUpdateBlog from "@/components/organism/feat/blog/CreateUpdateBlog";
import { SiteHeader } from "@/components/site-header";
import { useGetBlogById } from "@/hooks/services/blogs/useGetBlogById";
import { useParams } from "next/navigation";
import { use } from "react";

export default function SingleBlogEditViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useGetBlogById({ id });
  return (
    <section>
      <SiteHeader title="Edit Blog"></SiteHeader>
      {data && !isLoading && (
        <CreateUpdateBlog
          type="update"
          defaultValues={{
            title: data?.title ?? "",
            description: data?.description ?? "",
            content: data?.content ?? "",
            slug: data?.slug ?? "",
            isVisible: data?.isVisible ?? false,
            image: data?.coverImage?.url ?? "",
          }}
          id={id}
        />
      )}
    </section>
  );
}
