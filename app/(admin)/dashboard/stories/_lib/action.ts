import { BASE_URL } from "@/lib/constants";
import { PaginatedData, Story } from "@/lib/definitions";
import { StoryPayload } from "./definition";

export const getStories = async (
  title: string = "",
  level: string = "",
  category: string = "",
  page: number = 1,
  size: number = 100
): Promise<PaginatedData<Story> | null> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    title,
    category,
    level,
  });

  const response = await fetch(`${BASE_URL}/stories?${params.toString()}`, {
    // next: {
    //   revalidate: 60,
    //   tags: ['story'],
    // },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};



export const getStory = async (id: string): Promise<Story | null> => {
  const response = await fetch(`${BASE_URL}/stories/${id}`, {
    // next: {
    //   revalidate: 60,
    //   tags: ['story'],
    // },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch story: ${response.statusText}`);
  }

  return response.json();
};

export const createStory = async (story: StoryPayload) => {
  try {
    const response = await fetch(`${BASE_URL}/stories`, {
      method: 'POST',
      // body: JSON.stringify(story),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...story, contents: [{ chapter: 1, title: story.title, text: story.content }]}),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export const deleteStory = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/stories/${id}`, {
    method: 'DELETE',
    next: {
      revalidate: 0,
      tags: ['story'],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete story: ${response.statusText}`);
  }
};

export const updateStory = async (id: string, data: Partial<StoryPayload>): Promise<StoryPayload> => {
  const response = await fetch(`${BASE_URL}/stories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    next: {
      revalidate: 0,
      tags: ['story'],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to update story: ${response.statusText}`);
  }

  return response.json();
};
