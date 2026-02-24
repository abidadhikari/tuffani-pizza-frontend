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
    const response = await axiosInstance.get(`/api/product`);
    const menuData = JSON.parse(response.data);
    return menuData;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};

export const getStaticPageData = async () => {
  try {
    const response = await axiosInstance.get(`/api/static-content`);
    const staticPageData = JSON.parse(response.data);
    return staticPageData;
  } catch (error) {
    console.error("Error fetching static page data:", error);
    throw error;
  }
};
