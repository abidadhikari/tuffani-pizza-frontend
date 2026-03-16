import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/admin/*",
        "/profile",
        "/profile/",
        "/profile/*",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
