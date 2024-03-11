import { CollectionItem, Story, Video } from "./definitions";

export const collection: CollectionItem[] = [
  {
    id: 11,
    sourceText: "Dog",
    translation: "Cho"
  },
  {
    id: 21,
    sourceText: "Driven by a relentless curiosity",
    translation: "Được thúc đẩy bởi sự tò mò không ngừng"
  },
  {
    id: 32,
    sourceText: "Driven by a relentless curiosity",
    translation: "Được thúc đẩy bởi sự tò mò không ngừng"
  },
  {
    id: 17,
    sourceText: "In the dimly lit city of Noirville",
    translation: "Ở thành phố thiếu ánh sáng Noirville"
  },
]

export const videoList: Video[] = [
  {
    url: "https://www.youtube.com/watch?v=oqGuJhOeMek",
    title: "Cell vs. virus: A battle for health - Shannon Stiles",
    thumbnail: "https://i3.ytimg.com/vi/oqGuJhOeMek/maxresdefault.jpg",
    channel: "TED-ed",
    duration: "3:58",
    level: 3,
    topic: "Health"
  },
  {
    url: "https://www.youtube.com/watch?v=ER0Cu0KQFqM",
    title: "Who were the Vestal Virgins, and what was their job? - Peta Greenfield",
    thumbnail: "https://i3.ytimg.com/vi/ER0Cu0KQFqM/maxresdefault.jpg",
    channel: "TED-ed",
    duration: "4:33",
    level: 3,
    topic: "History"
  },
  {
    url: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
    title: "What is depression? - Helen M. Farrell",
    thumbnail: "https://i3.ytimg.com/vi/z-IR48Mb3W0/maxresdefault.jpg",
    channel: "TED-ed",
    duration: "4:28",
    level: 3,
    topic: "Education"
  },
]

export const storyList: Story[] = [
  {
    image: "https://img.freepik.com/premium-photo/summer-with-sunflower-field-anime-art-style_685067-1842.jpg",
    title: "Sunflowers at sunset",
    lastUpdated: "Jan 08, 2024",
    length: 10,
    summary: "In Noirville, Detective Alex Mercer navigates a perilous maze in a deserted warehouse...",
    level: 3,
    topic: "Mystery",
  },
  {
    image: "https://e1.pxfuel.com/desktop-wallpaper/321/39/desktop-wallpaper-sakura-blossom-petals-scenery-sky-cherry-cherry-blossom-anime-aesthetic.jpg",
    title: "Spring with blue sky",
    lastUpdated: "Jan 08, 2024",
    length: 10,
    summary: "In Noirville, Detective Alex Mercer navigates a perilous maze in a deserted warehouse...",
    level: 3,
    topic: "Mystery",
  },
  {
    image: "https://st2.depositphotos.com/2769299/9083/i/450/depositphotos_90835898-stock-photo-dark-mysterious-street.jpg",
    title: "Maze of Shadows",
    lastUpdated: "Jan 08, 2024",
    length: 10,
    summary: "In Noirville, Detective Alex Mercer navigates a perilous maze in a deserted warehouse...",
    level: 3,
    topic: "Mystery",
  },
]