import { Transcript } from "@/lib/definitions";


export type VideoPayload = {
  caption: string;
  category: string;
  level: string;
  channel: string;
  isPremium: boolean;
  videoId: string;
  duration: number;
  thumbnail: string;
  transcripts: Transcript[];
};
