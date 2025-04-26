
import React from 'react';
import { Video } from '../types/video';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onPlay: (video: Video) => void;
  onDelete: (id: string) => void;
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  currentVideoId?: string;
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

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-tubetunes-muted">No videos found. Try a different filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredVideos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onPlay={onPlay}
          onDelete={onDelete}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          isHighlighted={video.id === currentVideoId}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
