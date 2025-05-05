
import React, { useRef, useEffect } from 'react';
import { Video } from '../types/video';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  currentVideo: Video | null;
  autoplay?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ currentVideo, autoplay = false, className = '' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isValidYouTubeId = (id: string | undefined | null) => {
    return typeof id === "string" && id.length === 11;
  };

  useEffect(() => {
    if (iframeRef.current && currentVideo) {
      const iframe = iframeRef.current;
      const videoId = currentVideo.youtubeId;

      if (!isValidYouTubeId(videoId)) {
        console.error('Invalid YouTube ID:', videoId);
        return;
      }
      
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=0`; 
    }
  }, [currentVideo, autoplay]);

  return (
    <div className={cn("rounded-lg overflow-hidden relative", className)}>
      <div className="aspect-video w-full">
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&mute=0`}
          title={currentVideo.title || 'Video Player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="p-4 bg-tubetunes-secondary">
        <h2 className="text-xl font-bold mb-2">{currentVideo.title || 'Untitled Video'}</h2>
        <div className="flex justify-between items-center">
          <p className="text-tubetunes-muted">{currentVideo.channelName || 'Unknown Channel'}</p>
          <p className="text-tubetunes-muted text-sm">{currentVideo.views || 0} views</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
