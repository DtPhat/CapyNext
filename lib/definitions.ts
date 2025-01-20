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
  category: string,
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
  category?: string,
  comment?: []
  level?: string
  updatedAt: string,
  isPremium: boolean
}


export type Level = keyof typeof LEVEL_NUMBERS;

export type SubscriptionPlan = keyof typeof subscriptionPlans;

