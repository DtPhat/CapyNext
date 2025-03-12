'use server'
import { BASE_URL } from "@/lib/constants"
export const getStories = async (
  title: string = "",
  level: string = "",
  category: string = "",
  page: number = 1,
  size: number = 10
) => {
  try {
    const params = new URLSearchParams({
      ...(title && { title }),
      ...(level && { level }),
      ...(category && { category }),
      page: page.toString(),
      size: size.toString(),
    });

    const url = `${BASE_URL}/stories?${params.toString()}`;
    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['story'],
      },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log(url);
    return result;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return null;
  }
};

export const getStory = async (id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/stories/${id}`, {
      next: {
        revalidate: 60,
        tags: ['story']
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}