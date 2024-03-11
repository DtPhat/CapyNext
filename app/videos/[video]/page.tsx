'use client'
import React, { useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  IconButton,
} from "@material-tailwind/react";
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { LanguageIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { formatSeconds } from '@/app/lib/utils';
import TranslatableSection from '@/app/ui/translation/translatable-section';
import next from 'next';
import CollectionMenu from '@/app/ui/collection/add';
import Link from 'next/link';
import VideoCard, { MiniVideoCard } from '@/app/ui/video/card';
import { videoList } from '@/app/lib/placeholder-data';
import { Video } from '@/app/lib/definitions';
const YouTubePlayer = () => {
  const playerRef = useRef<YouTubePlayer>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [translatingsenteces, setTranslatingSentences] = useState<string[]>([])
  console.log(currentTime)

  const jumpToTimestamp = (timestamp: number) => {
    if (playerRef.current?.internalPlayer) {
      playerRef.current?.internalPlayer.seekTo(timestamp);
    }
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const handleStateChange = async (event: { target: YouTubePlayer, data: number }) => {
    if (event.data === 1) {
      // Video is playing
      const interval = setInterval(async () => {
        if (playerRef.current && playerRef.current.internalPlayer) {
          setCurrentTime(await playerRef.current.internalPlayer.getCurrentTime());
        }
      }, 1000); // Update current time every second
      return () => clearInterval(interval);
    }
    // setCurrentTime(await playerRef.current.internalPlayer.getCurrentTime())
  };

  const checkPlaying = (index: number) => {
    const currentTranscript = videoTranscripts[index];
    const nextTranscript = videoTranscripts[index + 1];
    if (currentTime >= currentTranscript.timestamp &&
      (!nextTranscript || currentTime < nextTranscript.timestamp)) {
      return true;
    }
    return false;
  }
  const opts = {
    height: '496',
    width: '720',
    playerVars: {
      autoplay: 1,
    },
  };

  const TabData = [
    {
      label: "Transcript",
      value: "transcript",
    },
    {
      label: "Full text",
      value: "fulltext",
    },
  ];

  const videoTranscripts = [
    {
      "sentence": "You're in line at the grocery store when, uh oh, someone sneezes on you.",
      "timestamp": 6,
      "translation": "Bạn đang đứng trong hàng ở cửa hàng tạp hóa khi, ớ, có người hắt vào bạn."
    },
    {
      "sentence": "The cold virus is sucked inside your lungs and lands on a cell on your airway lining.",
      "timestamp": 11,
      "translation": "Vi-rút cúm được hút vào phổi của bạn và đặt chân lên một tế bào trên lớp niêm mạc đường hô hấp của bạn."
    },
    {
      "sentence": "Every living thing on Earth is made of cells, from the smallest one-celled bacteria to the giant blue whale to you.",
      "timestamp": 16,
      "translation": "Mọi sinh vật trên Trái Đất đều được tạo thành từ tế bào, từ vi khuẩn đơn bào nhỏ nhất đến cá voi xanh khổng lồ và bạn."
    },
    {
      "sentence": "Each cell in your body is surrounded by a cell membrane, a thick flexible layer made of fats and proteins, that surrounds and protects the inner components.",
      "timestamp": 23,
      "translation": "Mỗi tế bào trong cơ thể của bạn đều được bao bọc bởi một màng tế bào, một lớp dày linh hoạt được làm từ chất béo và protein, bao quanh và bảo vệ các thành phần bên trong."
    },
    {
      "sentence": "It's semipermeable, meaning that it lets some thing pass in and out but blocks others.",
      "timestamp": 33,
      "translation": "Nó có thể xuyên qua một phần, có nghĩa là nó cho phép một số thứ đi qua nhưng chặn lại những thứ khác."
    },
    {
      "sentence": "The cell membrane is covered with tiny projections.",
      "timestamp": 38,
      "translation": "Màng tế bào được phủ bởi những dự đoán nhỏ."
    },
    {
      "sentence": "They all have functions, like helping cells adhere to their neighbors or binding to nutrients the cell will need.",
      "timestamp": 41,
      "translation": "Tất cả đều có chức năng, giống như giúp các tế bào bám vào hàng xóm của chúng hoặc kết dính vào chất dinh dưỡng mà tế bào sẽ cần."
    },
    {
      "sentence": "Animal and plant cells have cell membranes.",
      "timestamp": 47,
      "translation": "Tế bào động vật và thực vật đều có màng tế bào."
    },
    {
      "sentence": "Only plant cells have a cell wall, which is made of rigid cellulose that gives the plant structure.",
      "timestamp": 52,
      "translation": "Chỉ có tế bào thực vật có thành tế bào, được làm từ xenluloz cứng cáp tạo cấu trúc cho cây."
    },
    {
      "sentence": "The virus cell that was sneezed into your lungs is sneaky.",
      "timestamp": 56,
      "translation": "Tế bào vi-rút đã bị hắt vào phổi của bạn là một cách thâm hiểm."
    },
    {
      "sentence": "Pretending to be a friend, it attaches to a projection on the cell membrane, and the cell brings it through the cell membrane and inside.",
      "timestamp": 59,
      "translation": "Giả vờ là một người bạn, nó gắn vào một dự đoán trên màng tế bào, và tế bào đưa nó qua màng tế bào và bên trong."
    },
    {
      "sentence": "When the virus gets through, the cell recognizes its mistake.",
      "timestamp": 66,
      "translation": "Khi vi-rút đi qua, tế bào nhận ra sai lầm của mình."
    },
    {
      "sentence": "An enemy is inside!",
      "timestamp": 70,
      "translation": "Một kẻ thù ở bên trong!"
    },
    {
      "sentence": "Special enzymes arrive at the scene and chop the virus to pieces.",
      "timestamp": 72,
      "translation": "Các enzyme đặc biệt đến hiện trường và chặt vi-rút thành từng mảnh."
    },
    {
      "sentence": "They then send one of the pieces back through the cell membrane, where the cell displays it to warn neighboring cells about the invader.",
      "timestamp": 76,
      "translation": "Sau đó, họ gửi một trong số các mảnh đó lại qua màng tế bào, nơi tế bào hiển thị nó để cảnh báo các tế bào hàng xóm về kẻ xâm nhập."
    },
    {
      "sentence": "A nearby cell sees the warning and immediately goes into action.",
      "timestamp": 83,
      "translation": "Một tế bào gần đó nhìn thấy cảnh báo và ngay lập tức đưa vào hành động."
    },
    {
      "sentence": "It needs to make antibodies, proteins that will attack and kill the invading virus.",
      "timestamp": 87,
      "translation": "Nó cần tạo ra kháng thể, protein sẽ tấn công và tiêu diệt vi-rút xâm nhập."
    },
    {
      "sentence": "This process starts in the nucleus.",
      "timestamp": 93,
      "translation": "Quá trình này bắt đầu trong nhân."
    },
    {
      "sentence": "The nucleus contains our DNA, the blueprint that tells our cells how to make everything our bodies need to function.",
      "timestamp": 95,
      "translation": "Nhân chứa DNA của chúng ta, bản thiết kế cho biết tế bào cách tạo ra mọi thứ cơ thể chúng ta cần để hoạt động."
    }
  ]

  const fulltext = `We often hear of remarkable people who, through dedication and practice, seem to become one with their craft.

An example of such a person is Tsao-fu, a character from Taoist literature who wished to become a skilled charioteer.

So, he seized the opportunity to apprentice under an expert widely known for his exceptional mastery.

Years passed, and Tsao-fu served his master without receiving any instruction or lesson; he just worked and followed commands.

But rather than becoming disheartened, he displayed commitment, convincing the charioteer that he was worthy of his teachings.

One day, the master finally offered him a lesson.
`

  return (
    <div className='w-full px-16 py-8 max-w-7xl'>
      <TranslatableSection>
        <div className='flex gap-4 translatable'>
          <div>
            <YouTube
              videoId="oqGuJhOeMek"
              opts={opts}
              onReady={onReady}
              onStateChange={handleStateChange}
              ref={playerRef}
            />
          </div>
          <div className='bg-white rounded'>
            <Tabs value="transcript" >
              <TabsHeader className='rounded-none rounded-t-lg py-2'>
                {TabData.map(({ label, value }) => (
                  <Tab key={value} value={value} className='text-normal text-black'>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody className='h-[28rem] overflow-auto border-b-2 rounded'>
                {TabData.map(({ value }) => (
                  <TabPanel key={value} value={value} className='p-0 border-2 border-gray-200 rounded'>
                    {
                      value == 'fulltext' ?
                        <div className='flex flex-col item-center p-2 whitespace-pre-line overflow-auto'>
                          {fulltext}
                        </div>
                        : <div className='flex flex-col item-center overflow-auto'>
                          {videoTranscripts.map((transcript, index) =>
                            <div key={index} className={`py-1 flex gap-2 ${checkPlaying(index) ? 'bg-black/10' : ''} px-2 items-center border-b border-gray-300`}>
                              <div className='my-auto'>
                                <button
                                  onClick={() => jumpToTimestamp(transcript.timestamp)}
                                  className={`group border border-black/50 rounded-lg w-[3.75rem] gap-0.5 flex justify-center items-center hover:text-white hover:bg-black ${checkPlaying(index) ? 'bg-black/90 text-white' : ''}`}>
                                  <PlayIcon className={`w-4 h-4 ${checkPlaying(index) ? 'block' : 'hidden'} group-hover:block`} />
                                  <span>
                                    {formatSeconds(transcript.timestamp)}
                                  </span>
                                </button>
                              </div>
                              <div className='group'>
                                {translatingsenteces.includes(transcript.sentence) ? transcript.translation : transcript.sentence}
                                <button className='relative top-1 left-1 hidden group-hover:inline-block'
                                  onClick={() => setTranslatingSentences(
                                    translatingsenteces.includes(transcript.sentence)
                                      ? translatingsenteces.filter(sentence => sentence != transcript.sentence)
                                      : [...translatingsenteces, transcript.sentence])}
                                >
                                  <LanguageIcon className='w-[18px] h-[18px] hover:text-primary' />
                                </button>
                              </div>
                              <div className='flex flex-col gap-2 p-0'>
                              </div>
                            </div>
                          )}
                        </div>
                    }
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </TranslatableSection>
      <hr className="mt-16 mb-4 border-black/20" />
      <div>
        <h1 className="font-semibold pb-2">Related videos</h1>
        <div className="grid grid-cols-4 gap-4">
          {
            videoList.map((video: Video) =>
              <Link href='/videos/video' key={video.title}>
                <MiniVideoCard data={video} />
              </Link>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;