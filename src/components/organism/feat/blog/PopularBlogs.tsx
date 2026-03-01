"use client";

import Title from "@/components/atom/Title";
import BlogPostCard from "@/components/molecule/BlogPostCard";
import { useGetPopularBlogsBySlug } from "@/hooks/services/blogs/useGetPopularBlogsBySlug";

interface IPopularBlogsProps {
  slug: string;
}

export default function PopularBlogs(props: IPopularBlogsProps) {
  const { slug } = props;
  const { data: popularBlogs, isLoading } = useGetPopularBlogsBySlug(slug);
  return (
    <section>
      <Title variant="h6" className="uppercase text-[#42526E]">
        Popular blogs
      </Title>
      {popularBlogs && (
        <div className="grid gap-4 pt-5 ">
          {popularBlogs.map((blog, index) => (
            <BlogPostCard
              key={index}
              link={`/blog/${blog.slug}`}
              coverImage={blog.coverImage?.url}
              title={blog.title}
              description={blog.description || ""}
              createdAt="1 Jan 2023"
              author={"Admin"}
              variant="compact"
            />
          ))}
        </div>
      )}
      {isLoading && <p>Loading popular blogs...</p>}
    </section>
  );
}
