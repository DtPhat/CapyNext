import { BASE_URL } from "@/lib/constants";
import { PaginatedData, Category } from "@/lib/definitions";
import { CreateCategoryPayload } from "./definition";

export const getCategories = async (
  // name: string = "",
  page: number = 1,
  size: number = 100
): Promise<PaginatedData<Category> | null> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    // name,
  });

  const response = await fetch(`${BASE_URL}/categories?${params.toString()}`, {
    // next: {
    //   revalidate: 60,
    //   tags: ['category'],
    // },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export const getCategory = async (id: string): Promise<Category | null> => {
  const response = await fetch(`${BASE_URL}/categories/${id}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export const createCategory = async (category: CreateCategoryPayload) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
};

export const updateCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};
