'use server'
import { BASE_URL } from "@/lib/constants";
import { PaginatedData, Video } from "@/lib/definitions";

export const getVideos = async (
  title: string = "",
  level: string = "",
  category: string = "",
  page: number = 1,
  size: number = 9
): Promise<PaginatedData<Video> | null> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    caption: title,
    category,
    level,
  });

  const response = await fetch(`${BASE_URL}/videos?${params.toString()}`, {
    next: {
      revalidate: 60,
      tags: ['video'],
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

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