import ImagePlaceholder from "@/components/atom/ImagePlaceholder";
import Title from "@/components/atom/Title";
import BlogPostCard from "@/components/molecule/BlogPostCard";
import PopularBlogs from "@/components/organism/feat/blog/PopularBlogs";
import { getPublicBlogBySlug } from "@/hooks/services/public-services";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { User } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogData = await getPublicBlogBySlug(slug);

  return (
    <section>
      <div className="my-width mx-auto pt-40">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
          {blogData?.title}
        </h1>

        <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
          <div className="size-8 grid place-items-center bg-gray-400 rounded-full">
            <User className="size-5 text-white" />
          </div>
          By {blogData?.author?.name || "Admin"} | Published on{" "}
          {new Date(blogData?.createdAt || "").toLocaleDateString()} | 5 min
          read
        </div>

        <div className="md:min-h-100 mb-5">
          {blogData?.coverImage?.url ? (
            <Image
              src={blogData?.coverImage?.url}
              alt="Blog Post Image"
              width={800}
              height={400}
              className="w-full  mb-8"
            />
          ) : (
            <ImagePlaceholder className="min-h-100" />
          )}
        </div>

        <section className="flex flex-col md:flex-row gap-6 pb-10">
          <div
            className="w-full"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(blogData?.content),
            }}
          ></div>
          <div className="min-w-80">
            <PopularBlogs slug={blogData?.slug} />
          </div>
        </section>
      </div>
    </section>
  );
}
