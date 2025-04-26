
import React from 'react';
import { Video } from '../types/video';
import { ThumbsUp, ThumbsDown, Play, Trash } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  onDelete: (id: string) => void;
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  isHighlighted?: boolean;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  onPlay, 
  onDelete, 
  onUpvote, 
  onDownvote, 
  isHighlighted = false,
  className = ''
}) => {
  return (
    <div 
      className={cn(
        "bg-tubetunes-secondary rounded-lg overflow-hidden relative group video-card-hover",
        isHighlighted && "ring-2 ring-tubetunes-accent",
        className
      )}
    >
      <div className="relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full aspect-video object-cover"
        />
        <div className="overlay-gradient" />
        
        <button 
          onClick={() => onPlay(video)} 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"
        >
          <div className="bg-tubetunes-accent rounded-full p-3">
            <Play className="text-white" size={24} />
          </div>
        </button>
        
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
          {formatNumber(video.views)} views
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
        <p className="text-tubetunes-muted text-xs mt-1">{video.channelName}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-2">
            <button 
              onClick={() => onUpvote(video.id)} 
              className="vote-button"
              aria-label="Upvote"
            >
              <ThumbsUp size={16} />
              <span className="text-xs">{formatNumber(video.upvotes)}</span>
            </button>
            <button 
              onClick={() => onDownvote(video.id)} 
              className="vote-button"
              aria-label="Downvote"
            >
              <ThumbsDown size={16} />
              <span className="text-xs">{formatNumber(video.downvotes)}</span>
            </button>
          </div>
          
          <button 
            onClick={() => onDelete(video.id)} 
            className="text-tubetunes-muted hover:text-tubetunes-accent transition-colors p-1"
            aria-label="Delete video"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
