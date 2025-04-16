import { BASE_URL } from "@/lib/constants";
import { PaginatedData, Video } from "@/lib/definitions";
import { CreateVideoPayload } from "./definition";

export const getVideos = async (
  title: string = "",
  level: string = "",
  category: string = "",
  page: number = 1,
  size: number = 100
): Promise<PaginatedData<Video> | null> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    caption: title,
    category,
    level,
  });

  const response = await fetch(`${BASE_URL}/videos?${params.toString()}`, {
    // next: {
    //   revalidate: 60,
    //   tags: ['video'],
    // },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};



export const getVideo = async (id: string): Promise<Video | null> => {
  const response = await fetch(`${BASE_URL}/videos/${id}`, {
    // next: {
    //   revalidate: 60,
    //   tags: ['video'],
    // },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch video: ${response.statusText}`);
  }

  return response.json();
};

export const createVideo = async (video: CreateVideoPayload) => {

  // const fakeData: Omit<Video, "_id"> = {
  //   "caption": "123",
  //   "category": "education",
  //   "level": "beginner",
  //   "channel": "1234",
  //   "isPremium": false,
  //   "videoId": "665656565656565656565656",
  //   "duration": 100,
  //   "thumbnail": "https://via.placeholder.com/150",
  //   "transcripts": [
  //     {
  //       "sentence": "Hello world!",
  //       "timestamp": 0,
  //       "translation": "Bonjour le monde!"
  //     }
  //   ]
  // }
  try {
    const response = await fetch(`${BASE_URL}/videos`, {
      method: 'POST',
      // body: JSON.stringify(video),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export const deleteVideo = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/videos/${id}`, {
    method: 'DELETE',
    next: {
      revalidate: 0,
      tags: ['video'],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete video: ${response.statusText}`);
  }
};

export const updateVideo = async (id: string, data: Partial<Video>): Promise<Video> => {
  const response = await fetch(`${BASE_URL}/videos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    next: {
      revalidate: 0,
      tags: ['video'],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to update video: ${response.statusText}`);
  }

  return response.json();
};

export const getParsedTranscript = async (rawText: string) => {
  const response = await fetch(`${BASE_URL}/videos/parsed-transcript`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawText),
    next: {
      revalidate: 0,
      tags: ['video'],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get transcript: ${response.statusText}`);
  }

  return response.json();
};

