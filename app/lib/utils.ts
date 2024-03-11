import { CollectionItem } from "./definitions";
import shuffle from "lodash/shuffle";

export const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  return formattedTime;
}

export const splitCollection = (data: CollectionItem[]) => {
  const slitData: slitData = []
  data.forEach(item => {
    const { id, sourceText, translation } = item
    slitData.push(
      {
        id,
        text: sourceText,
      },
      {
        id,
        text: translation,
      }
    )
  });
  return shuffle(slitData)
}

type slitData = {
  id: number,
  text: string
}[]