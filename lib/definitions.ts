import { LEVEL_NUMBERS, subscriptionPlans } from "./constants"

export type CollectionItem = {
  _id: string,
  sourceText: string,
  translation: string,
  collectionId?: string
}

export type Collection = {
  _id: string
  userId?: string,
  name: string,
  picture: string,
  totalVocab?: number,
  vocabularies?: CollectionItem[]
  description: string
}
export type Transcript = {
  sentence: string,
  timestamp: number,
  translation: string
}

export type Video = {
  _id: string,
  videoId: string,
  category?: Category,
  thumbnail: string,
  duration: number,
  caption: string,
  channel: string,
  level: string,
  transcripts: Transcript[],
  isPremium: boolean,
}

export type Story = {
  _id: string,
  title: string,
  author: string,
  views: number,
  description: string,
  contents: {
    chapter: number,
    title: string,
    text: string
  }[],
  display_image: string,
  category?: Category,
  comment?: []
  level?: string
  updatedAt: string,
  isPremium: boolean
}

export type Category = {
  _id: string,
  name: string,
}

export type PaginatedData<T> = {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
};

export type Level = keyof typeof LEVEL_NUMBERS;

export type SubscriptionPlan = keyof typeof subscriptionPlans;

