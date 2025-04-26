
import React, { useRef, useEffect } from 'react';
import { Video } from '../types/video';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  currentVideo: Video | null;
  autoplay?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ currentVideo, autoplay = true, className = '' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset iframe when video changes to force reload
  useEffect(() => {
    if (iframeRef.current && currentVideo) {
      const iframe = iframeRef.current;
      const parent = iframe.parentNode;
      if (parent) {
        iframe.src = `https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=${autoplay ? 1 : 0}&mute=0`;
      }
    }
  }, [currentVideo, autoplay]);

  if (!currentVideo) {
    return (
      <div className={cn("bg-tubetunes-secondary rounded-lg flex items-center justify-center aspect-video", className)}>
        <p className="text-tubetunes-muted">Select a video to play</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg overflow-hidden relative", className)}>
      <div className="aspect-video w-full">
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=${autoplay ? 1 : 0}&mute=0`}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="p-4 bg-tubetunes-secondary">
        <h2 className="text-xl font-bold mb-2">{currentVideo.title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-tubetunes-muted">{currentVideo.channelName}</p>
          <p className="text-tubetunes-muted text-sm">{currentVideo.views} views</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
