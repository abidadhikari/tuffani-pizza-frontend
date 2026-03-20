import { getAllPublicBlogs } from "@/hooks/services/public-services";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/blog", "/contact-us", "/about-us", "/menu"];
  const allBlogs = await getAllPublicBlogs();

  const blogRoutes = allBlogs.map(
    (blog: { slug: string; updatedAt: string }) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  const staticPages = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  return [...staticPages, ...blogRoutes];
}
