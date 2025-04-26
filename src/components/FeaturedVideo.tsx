
import React, { useState, useEffect } from 'react';
import { Video } from '../types/video';
import { Play } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';
import { Button } from '@/components/ui/button';

interface FeaturedVideoProps {
  videos: Video[];
  onPlay: (video: Video) => void;
}

const FeaturedVideo: React.FC<FeaturedVideoProps> = ({ videos, onPlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate featured videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % videos.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  if (videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg animate-fade-in">
      <img
        src={currentVideo.thumbnailUrl}
        alt={currentVideo.title}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{currentVideo.title}</h1>
        <p className="text-tubetunes-accent mb-2">{currentVideo.channelName}</p>
        <div className="flex items-center gap-4 mb-6">
          <p>{formatNumber(currentVideo.views)} views</p>
          <p>{formatNumber(currentVideo.upvotes)} likes</p>
        </div>
        
        <Button 
          onClick={() => onPlay(currentVideo)} 
          className="bg-tubetunes-accent hover:bg-tubetunes-accent/80 gap-2 text-white"
        >
          <Play size={16} />
          Play Video
        </Button>
      </div>
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        {videos.slice(0, 4).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-tubetunes-accent' : 'bg-white/30'}`}
            aria-label={`Show featured video ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedVideo;
