
import React from 'react';
import { Video } from '../types/video';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onPlay: (video: Video) => void;
  onDelete: (id: number) => void;
  onUpvote: (id: number) => void;
  onDownvote: (id: number) => void;
  currentVideoId?: number;
  filter?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  onPlay, 
  onDelete, 
  onUpvote, 
  onDownvote,
  currentVideoId,
  filter = ''
}) => {

  // Filter videos based on the search term
  const filteredVideos = filter
  ? videos.filter(
      video =>
        video.title.toLowerCase().includes(filter.toLowerCase()) ||
        video.channelName.toLowerCase().includes(filter.toLowerCase())
    )
  : videos;

  if (!filteredVideos.length) {
    return (
      <div className="text-center py-8">
        <p className="text-tubetunes-muted">No videos found. Try a different filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredVideos.map((video, index) => (
        <VideoCard
          key={video.id || `video-${index}`}
          video={video}
          onPlay={onPlay}
          onDelete={(id) => onDelete(id)}
          onUpvote={(id) => onUpvote(id)}
          onDownvote={(id) => onDownvote(id)}
          isHighlighted={video.id === Number(currentVideoId)}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
