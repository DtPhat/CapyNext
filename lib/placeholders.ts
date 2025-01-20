import { CollectionItem, Story, Video } from "./definitions";

export const collection: CollectionItem[] = [
  {
    _id: "1",
    sourceText: "Hello, how are you?",
    translation: "Xin chào, bạn khỏe không?"
  },
  {
    _id: "2",
    sourceText: "What is your name?",
    translation: "Tên bạn là gì?"
  },
  {
    _id: "3",
    sourceText: "I love programming.",
    translation: "Tôi yêu lập trình."
  },
  {
    _id: "4",
    sourceText: "This is a beautiful day.",
    translation: "Hôm nay là một ngày đẹp."
  },
  {
    _id: "5",
    sourceText: "Can you help me?",
    translation: "Bạn có thể giúp tôi không?"
  },
  {
    _id: "6",
    sourceText: "Where is the nearest restaurant?",
    translation: "Nhà hàng gần nhất ở đâu?"
  },
  {
    _id: "7",
    sourceText: "I am learning Vietnamese.",
    translation: "Tôi đang học tiếng Việt."
  },
  {
    _id: "8",
    sourceText: "How much does this cost?",
    translation: "Cái này giá bao nhiêu?"
  },
  {
    _id: "9",
    sourceText: "Thank you for your help.",
    translation: "Cảm ơn bạn đã giúp đỡ."
  },
  {
    _id: "10",
    sourceText: "Good morning!",
    translation: "Chào buổi sáng!"
  }
]

export const videoList: Video[] = [
  {
    _id: "https://www.youtube.com/watch?v=oqGuJhOeMek",
    videoId: "oqGuJhOeMek",
    caption: "Cell vs. virus: A battle for health - Shannon Stiles",
    thumbnail: "https://i3.ytimg.com/vi/oqGuJhOeMek/maxresdefault.jpg",
    channel: "TED-ed",
    duration: 238,
    level: "Intermediate",
    category: "Health",
    transcripts: [

    ],
    isPremium: false,
  },
  {
    _id: "https://www.youtube.com/watch?v=ER0Cu0KQFqM",
    videoId: "ER0Cu0KQFqM",
    caption: "Who were the Vestal Virgins, and what was their job? - Peta Greenfield",
    thumbnail: "https://i3.ytimg.com/vi/ER0Cu0KQFqM/maxresdefault.jpg",
    channel: "TED-ed",
    duration: 200,
    level: "Beginner",
    category: "History",
    transcripts: [

    ],
    isPremium: false,
  },
  {
    _id: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
    videoId: "z-IR48Mb3W0",
    caption: "What is depression? - Helen M. Farrell",
    thumbnail: "https://i3.ytimg.com/vi/z-IR48Mb3W0/maxresdefault.jpg",
    channel: "TED-ed",
    duration: 120,
    level: "Beginner",
    category: "Education",
    transcripts: [

    ],
    isPremium: false,

  },
]

export const storyList: any[] = [
  {
    display_image: "https://img.freepik.com/premium-photo/summer-with-sunflower-field-anime-art-style_685067-1842.jpg",
    title: "Sunflowers at sunset",
    lastUpdated: "Jan 08, 2024",
    length: 10,
    description: "In Noirville, Detective Alex Mercer navigates a perilous maze in a deserted warehouse...",
    level: 3,
    topic: "Mystery",
  },
  {
    display_image: "https://e1.pxfuel.com/desktop-wallpaper/321/39/desktop-wallpaper-sakura-blossom-petals-scenery-sky-cherry-cherry-blossom-anime-aesthetic.jpg",
    title: "Spring with blue sky",
    lastUpdated: "Jan 08, 2024",
    length: 10,
    description: "In Noirville, Detective Alex Mercer navigates a perilous maze in a deserted warehouse...",
    level: 3,
    topic: "Mystery",
  },
  {
    display_image: "https://st2.depositphotos.com/2769299/9083/i/450/depositphotos_90835898-stock-photo-dark-mysterious-street.jpg",
    title: "Maze of Shadows",
    lastUpdated: "Jan 08, 2024",
    length: 10,
    description: "In Noirville, Detective Alex Mercer navigates a perilous maze in a deserted warehouse...",
    level: 3,
    topic: "Mystery",
  },
  {
    display_image: "https://w0.peakpx.com/wallpaper/146/116/HD-wallpaper-anime-original-sky-snow-winter.jpg",
    title: "Alone in snow",
    lastUpdated: "Jan 08, 2024",
    length: 10,
    description: "In Noirville, Detective Alex Mercer navigates a perilous maze in a deserted warehouse...",
    level: 3,
    topic: "Mystery",
  },
]

export const chartData = [
  {
    name: 'Feb',
    total: 0
  },
  {
    name: 'Mar',
    total: 0
  },
  {
    name: 'Apr',
    total: 0
  },
  {
    name: 'May',
    total: 0
  },
  {
    name: 'Jun',
    total: 500000
  },
  {
    name: 'July',
    total: 1250000
  },
];


export const subscribersData = [

  {
    img: "https://random-image.jpg",
    name: "Nguyễn Văn Quân",
    email: "quannv26042003@gmail.com",
    completed: true,
    date: "18/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Trần Thị Lan",
    email: "tranlan77@gmail.com",
    completed: true,
    date: "18/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Lê Văn Hoàng",
    email: "levanhoang1985@gmail.com",
    completed: true,
    date: "16/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Phạm Thị Nga",
    email: "nga.pham123@gmail.com",
    completed: true,
    date: "15/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Hoàng Văn Lâm",
    email: "hoang.lam1960@gmail.com",
    completed: true,
    date: "14/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Nguyễn Thị Mai",
    email: "mai.nguyen890@gmail.com",
    completed: true,
    date: "14/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Vũ Văn Nam",
    email: "vnam1987@gmail.com",
    completed: true,
    date: "14/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Đỗ Văn Phúc",
    email: "dovanphuc567@gmail.com",
    completed: true,
    date: "11/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Phạm Thị Hoa",
    email: "phamhoa11@gmail.com",
    completed: true,
    date: "11/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Lê Thị Huệ",
    email: "hue.le1975@gmail.com",
    completed: true,
    date: "09/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Nguyễn Văn Đức",
    email: "nguyenvanduc1989@gmail.com",
    completed: true,
    date: "08/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Trần Văn Bình",
    email: "tranbinh2020@gmail.com",
    completed: true,
    date: "07/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Lê Thị Thanh",
    email: "lethithanh88@gmail.com",
    completed: true,
    date: "07/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Nguyễn Thị Ngọc",
    email: "ngoc.nguyen777@gmail.com",
    completed: true,
    date: "05/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Phạm Văn An",
    email: "phanvanan2015@gmail.com",
    completed: true,
    date: "04/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Hoàng Thị Bảo",
    email: "hoangbao1982@gmail.com",
    completed: true,
    date: "03/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Nguyễn Văn Cường",
    email: "nguyenvancuong99@gmail.com",
    completed: true,
    date: "03/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Trần Thị Hương",
    email: "huong17042004@gmail.com",
    completed: true,
    date: "01/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Lê Văn Thanh",
    email: "levanthanh123@gmail.com",
    completed: true,
    date: "18/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Phạm Thị Quỳnh",
    email: "phamquynh1992@gmail.com",
    completed: true,
    date: "17/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Hoàng Văn Tâm",
    email: "hoang.tam1986@gmail.com",
    completed: true,
    date: "16/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Nguyễn Thị Thảo",
    email: "nguyenthithao2024@gmail.com",
    completed: true,
    date: "15/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Vũ Văn Dũng",
    email: "vudung76@gmail.com",
    completed: true,
    date: "14/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Đỗ Thị Hồng",
    email: "dothihong54@gmail.com",
    completed: true,
    date: "13/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Phạm Văn Tú",
    email: "phamtuvt@gmail.com",
    completed: true,
    date: "12/07/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Lê Thị Kim",
    email: "kimle1989@gmail.com",
    completed: true,
    date: "11/07/2024",
    amount: 50000,
  },
  // Phrase 2:
  {
    img: "https://random-image.jpg",
    name: "Nguyễn Văn Anh",
    email: "nguyenvananh123@gmail.com",
    completed: true,
    date: "30/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Trần Thị Bích",
    email: "bichtran91@gmail.com",
    completed: true,
    date: "30/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Lê Văn Đức",
    email: "levanduc83@gmail.com",
    completed: true,
    date: "28/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Phạm Thị Hà",
    email: "phamthiha22@gmail.com",
    completed: true,
    date: "24/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Hoàng Văn Hoàng",
    email: "hoangvanhoang78@gmail.com",
    completed: true,
    date: "24/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Nguyễn Thị Hương",
    email: "nguyenthihuong2023@gmail.com",
    completed: true,
    date: "24/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Vũ Văn Khánh",
    email: "vuvankhanh1994@gmail.com",
    completed: true,
    date: "24/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Đỗ Thị Lan",
    email: "dothilan90@gmail.com",
    completed: true,
    date: "22/06/2024",
    amount: 50000,
  },
  {
    img: "https://random-image.jpg",
    name: "Phạm Văn Minh",
    email: "minhpham.greenhouse@gmail.com",
    completed: true,
    date: "22/06/2024",
    amount: 50000,
  },
];