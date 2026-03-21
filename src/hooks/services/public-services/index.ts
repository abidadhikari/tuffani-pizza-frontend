import { Axios } from "axios";
import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = process.env.BACKEND_URL;

export const axiosInstance = new Axios({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
  },
});

type AddonLite = {
  id: string;
  name: string;
  price: number;
};

type ProductAddonRef = {
  addonId: string;
};

const safeParseJson = (value: unknown) => {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const normalizeAddonList = (payload: unknown): AddonLite[] => {
  if (!Array.isArray(payload)) return [];

  return payload
    .filter((entry): entry is Record<string, unknown> => {
      if (!entry || typeof entry !== "object") return false;

      return (
        typeof entry.id === "string" &&
        typeof entry.name === "string" &&
        (typeof entry.price === "number" || typeof entry.price === "string")
      );
    })
    .map((entry) => ({
      id: entry.id as string,
      name: entry.name as string,
      price: Number(entry.price),
    }));
};

const extractAddonIds = (productAddons: unknown): string[] => {
  if (!Array.isArray(productAddons)) return [];

  return productAddons
    .map((row) => {
      if (!row || typeof row !== "object") return undefined;
      const addonId = (row as ProductAddonRef).addonId;
      return typeof addonId === "string" ? addonId : undefined;
    })
    .filter((id): id is string => Boolean(id));
};

const hydrateMenuAddons = async (menuData: unknown) => {
  if (!Array.isArray(menuData)) return [];

  const products = menuData as Array<Record<string, unknown>>;
  const needsHydration = products.some((product) => {
    const hasDirectAddons =
      Array.isArray(product.addons) && product.addons.length > 0;
    const hasProductAddons =
      Array.isArray(product.productAddons) && product.productAddons.length > 0;

    return !hasDirectAddons && hasProductAddons;
  });

  if (!needsHydration) return menuData;

  let addonById = new Map<string, AddonLite>();

  try {
    const addonResponse = await axiosInstance.get(`/api/addon`, {
      withCredentials: false,
    });
    const addonPayload = safeParseJson(addonResponse?.data);
    const normalizedAddons = normalizeAddonList(addonPayload);
    addonById = new Map(normalizedAddons.map((addon) => [addon.id, addon]));
  } catch (error) {
    console.error("Error fetching addons for menu hydration:", error);
  }

  return products.map((product) => {
    const existingAddons = normalizeAddonList(product.addons);

    if (existingAddons.length > 0) {
      return {
        ...product,
        addons: existingAddons,
      };
    }

    const addonIds = extractAddonIds(product.productAddons);
    const hydratedAddons = addonIds
      .map((id) => addonById.get(id))
      .filter((addon): addon is AddonLite => Boolean(addon));

    return {
      ...product,
      addons: hydratedAddons,
    };
  });
};

export const getMenu = async () => {
  try {
    const response = await axiosInstance.get(`/api/product`, {
      withCredentials: false,
    });
    const menuPayload = safeParseJson(response?.data);
    const hydratedMenu = await hydrateMenuAddons(menuPayload);
    return Array.isArray(hydratedMenu) ? hydratedMenu : [];
  } catch (error) {
    console.error("Error fetching menu:", error);
    // Return empty array on error instead of throwing
    // This prevents the entire page from failing during throttling or API outages
    return [];
  }
};

export const getStaticPageData = async () => {
  try {
    const response = await axiosInstance.get(`/api/static-content`, {
      withCredentials: false,
    });
    const staticPageData = JSON.parse(response.data);
    return staticPageData || {};
  } catch (error) {
    console.error("Error fetching static page data:", error);
    // Return empty object as fallback
    return {};
  }
};

export const getTestimonials = async () => {
  try {
    const response = await axiosInstance.get(`/api/testimonial`, {
      withCredentials: false,
    });
    const testimonialsData = JSON.parse(response.data);
    return Array.isArray(testimonialsData) ? testimonialsData : [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    // Return empty array as fallback
    return [];
  }
};

export const getAllPublicBlogs = async () => {
  try {
    const response = await axiosInstance.get(`/api/blog?page=1&limit=100`, {
      withCredentials: false,
    });
    const blogsData = JSON.parse(response.data)?.data || [];
    console.log("Parsed blogs data:", blogsData);
    return Array.isArray(blogsData) ? blogsData : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    // Return empty array as fallback
    return [];
  }
};

export const getPublicBlogBySlug = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/api/blog/slug/${slug}`, {
      withCredentials: false,
    });
    const blogData = JSON.parse(response.data);
    return blogData;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
};

export const getAllPublicGallery = async () => {
  try {
    const response = await axiosInstance.get(`/api/static-content/gallery`, {
      withCredentials: false,
    });
    const galleryData = JSON.parse(response.data);
    return galleryData;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
};

export const getPublicOffers = async () => {
  try {
    const response = await axiosInstance.get(`/api/offer`, {
      withCredentials: false,
    });
    const offersData = JSON.parse(response.data);
    return Array.isArray(offersData) ? offersData : [];
  } catch (error) {
    console.error("Error fetching offers:", error);
    // Return empty array as fallback
    return [];
  }
};
