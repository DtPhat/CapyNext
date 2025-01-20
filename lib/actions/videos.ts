'use server'
import { BASE_URL } from "../constants";

export const getVideos = async (title: string = "", level: string = "", category: string = "", page: number = 1, size: number = 100) => {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?page=${page}&size=${size}&caption=${title}&category=${category}&level=${level}`, {
      next: {
        revalidate: 60,
        tags: ['video']
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