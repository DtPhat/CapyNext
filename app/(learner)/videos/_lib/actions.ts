'use server'
import { BASE_URL } from "@/lib/constants";

export const getVideos = async (title = "", level = "", category = "", page = 1, size = 9) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      caption: title,
      category,
      level,
    });

    const url = `${BASE_URL}/videos?${params.toString()}`;
    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['video'],
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return null;
  }
}

export const getVideo = async (id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/videos/${id}`, {
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