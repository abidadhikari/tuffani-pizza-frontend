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

export const getMenu = async () => {
  try {
    const response = await axiosInstance.get(`/api/product`, {
      withCredentials: false,
    });
    const menuData = JSON.parse(response?.data) || [];
    return menuData;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};

export const getStaticPageData = async () => {
  try {
    const response = await axiosInstance.get(`/api/static-content`, {
      withCredentials: false,
    });
    const staticPageData = JSON.parse(response.data);
    return staticPageData;
  } catch (error) {
    console.error("Error fetching static page data:", error);
    throw error;
  }
};

export const getTestimonials = async () => {
  try {
    const response = await axiosInstance.get(`/api/testimonial`, {
      withCredentials: false,
    });
    const testimonialsData = JSON.parse(response.data);
    return testimonialsData;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

export const getAllPublicBlogs = async () => {
  try {
    const response = await axiosInstance.get(`/api/blog?page=1&limit=100`, {
      withCredentials: false,
    });
    const blogsData = JSON.parse(response.data)?.data || [];
    console.log("Parsed blogs data:", blogsData);
    return blogsData;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
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
    return offersData;
  } catch (error) {
    console.error("Error fetching offers:", error);
    throw error;
  }
};
