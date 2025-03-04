'use client'
import { Skeleton } from '@/components/ui/skeleton';
import { Transcript, Video } from '@/lib/definitions';
import { formatSeconds } from '@/lib/helpers/time';
import { LanguageIcon, PlayIcon } from '@heroicons/react/24/solid';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from "@material-tailwind/react";
import { useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import useSWR from 'swr';
const VideoPlayer = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useSWR(`/videos/${id}`)
  const playerRef = useRef<YouTubePlayer>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [translatingsenteces, setTranslatingSentences] = useState<string[]>([])
  const [videoWidth, videoHeight] = [720, 500]
  const video: Video = data
  const videoTranscripts: Transcript[] = video?.transcripts || []

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

  const isVideoPlaying = (index: number) => {
    const currentTranscript = videoTranscripts[index];
    const nextTranscript = videoTranscripts[index + 1];
    if (currentTime >= currentTranscript.timestamp &&
      (!nextTranscript || currentTime < nextTranscript.timestamp)) {
      return true;
    }
    return false;
  }
  const opts = {
    height: videoHeight,
    width: videoWidth,
    playerVars: {
      autoplay: 1,
    },
  };
  const fulltext = videoTranscripts.reduce((accumulatedText, transcript) => accumulatedText.concat(transcript.sentence, '\n'), '')
  const transcriptPanel = (
    <div className='flex flex-col item-center overflow-auto'>
      {videoTranscripts.map((transcript, index) =>
        <div key={index} className={`py-1 flex gap-2 ${isVideoPlaying(index) ? 'bg-black/10' : ''} px-2 items-center border-b border-gray-300`}>
          <div className='my-auto'>
            <button
              onClick={() => jumpToTimestamp(transcript.timestamp)}
              className={`group border border-black/50 rounded-lg w-[3.75rem] gap-0.5 flex justify-center items-center hover:text-white hover:bg-black ${isVideoPlaying(index) ? 'bg-black/90 text-white' : ''}`}>
              <PlayIcon className={`w-4 h-4 ${isVideoPlaying(index) ? 'block' : 'hidden'} group-hover:block`} />
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
          <div className='flex flex-col gap-2 p-0'></div>
        </div>
      )}
    </div>
  )

  const fullTextPanel = (
    <div className='flex flex-col item-center p-2 whitespace-pre-line overflow-auto'>
      {fulltext}
    </div>
  )

  const TabData = [
    {
      label: "Transcript",
      value: "transcript",
      panel: transcriptPanel,
    },
    {
      label: "Full text",
      value: "fulltext",
      panel: fullTextPanel
    },
  ];


  return (
    <section>
      <h1 className='font-bold text-xl mb-2'>{video?.caption}</h1>
      <div className='flex flex-col lg:flex-row gap-4 translatable'>
        <div className='w-3/4'>
          {
            isLoading ?
              <Skeleton className="w-full h-[28rem]" />
              : <YouTube
                videoId={video?.videoId}
                opts={opts}
                onReady={onReady}
                onStateChange={handleStateChange}
                ref={playerRef}
              />
          }
        </div>
        <div className='bg-white rounded w-1/2'>
          {
            isLoading ?
              <Skeleton className="w-full h-[28rem]" />
              : <Tabs value="transcript" >
                <TabsHeader className='rounded-none rounded-t-lg py-2'>
                  {TabData.map(({ label, value }) => (
                    <Tab key={value} value={value} className='text-normal text-black'>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody className='rounded'>
                  {TabData.map(({ value, panel }) => (
                    <TabPanel key={value} value={value} className='p-0 border-2 border-gray-200 rounded h-[28rem] overflow-auto'>
                      {panel}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
          }
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer