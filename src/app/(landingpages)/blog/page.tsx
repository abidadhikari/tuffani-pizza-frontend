import { BlogResponseDto } from "@/client";
import Title from "@/components/atom/Title";
import BlogPostCard from "@/components/molecule/BlogPostCard";
import HeroSectionWithFoods from "@/components/template/HeroSectionWithFoods";
import {
  getAllPublicBlogs,
  getStaticPageData,
} from "@/hooks/services/public-services";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";

export default async function BlogHomePage() {
  const allBlogs = await getAllPublicBlogs();
  const staticContents = await getStaticPageData();
  const rawData = fetchStaticContent(
    STATIC_CONTENT_KEYS.BLOG_PAGE_HERO_SECTION,
    staticContents,
  );
  return (
    <section className="">
      <HeroSectionWithFoods
        title={{
          prefix: rawData?.value?.title?.prefix || "",
          highlight: rawData?.value?.title?.highlight || "",
          suffix: rawData?.value?.title?.suffix || "",
        }}
        description={rawData?.value?.description}
      >
        <div className="py-16 space-y-11">
          <Title variant="h2">Featured Blogs</Title>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((blog: BlogResponseDto) => (
              <BlogPostCard
                key={blog.id}
                link={`/blog/${blog.slug}`}
                coverImage={blog.coverImage?.url}
                title={blog.title}
                description={blog.description}
                createdAt={blog.createdAt}
                author={"Admin"}
              />
            ))}
          </div>
        </div>
      </HeroSectionWithFoods>
    </section>
  );
}
