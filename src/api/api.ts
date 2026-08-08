import { type Category } from "@/types/category.type";
import { axiosInstance } from "./axiosInstances/axiosInstance";
import type { Product, ProductApiRes } from "@/types/products.type";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await axiosInstance.get<Category[]>("/categories");
    return categories.data;
  } catch (err) {
    throw err;
  }
};

export const getProducts = async (
  limit: number,
  skip: number,
  category?: string,
): Promise<ProductApiRes> => {
  try {
    const products = await axiosInstance.get<ProductApiRes>(
      category ? `/category/${category}` : "",
      {
        params: {
          limit,
          skip,
        },
      },
    );
    return products.data;
  } catch (err) {
    throw err;
  }
};

export const searchProducts = async (
  term: string,
  limit: number,
  skip: number,
): Promise<ProductApiRes> => {
  try {
    const products = await axiosInstance.get<ProductApiRes>("search?", {
      params: {
        q: term,
        limit,
        skip,
      },
    });
    return products.data;
  } catch (err) {
    throw err;
  }
};

export const getSingleProduct = async (id: number): Promise<Product> => {
  try {
    const product = await axiosInstance.get<Product>(`/${id}`);
    return product.data;
  } catch (err) {
    throw err;
  }
};
