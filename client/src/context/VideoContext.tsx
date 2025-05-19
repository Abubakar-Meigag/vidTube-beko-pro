import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video } from '../types/video';


interface BackendVideo {
  id: number;
  title: string;
  youtubeid: string;
  channelname: string;
  thumbnailurl: string;
  upvotes: number;
  downvotes: number;
  views: number;
}

interface VideoContextType {
  videos: Video[];
  fetchVideos: () => Promise<void>;
  addVideo: (title: string, youtubeId: string) => Promise<void>;
  deleteVideo: (id: number) => Promise<void>; 
  upvoteVideo: (id: number) => void;
  downvoteVideo: (id: number) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:6006'; // command after is change the new ip in vite api ip for terraform
  const url = `${apiBaseUrl}/api/videos`;

  const [videos, setVideos] = useState<Video[]>([]);



  // Fetch all videos from the backend
  const fetchVideos = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
  
      const result: { data: BackendVideo[] } = await response.json();
      const transformedVideos = result.data.map((video) => ({
        id: video.id,
        title: video.title,
        youtubeId: video.youtubeid,
        channelName: video.channelname,
        thumbnailUrl: video.thumbnailurl,
        upvotes: video.upvotes,
        downvotes: video.downvotes,
        views: video.views,
      }));
      setVideos(transformedVideos);

    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
    }
  };  

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  // Add a new video using the backend POST endpoint
  const addVideo = async (title: string, url: string) => {
    const youtubeId = extractYouTubeId(url);
  
    if (!youtubeId) {
      throw new Error('Invalid YouTube URL');
    }
    
    try {
      const response = await fetch(`${apiBaseUrl}/api/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, youtubeId }),
      });
      if (!response.ok) {
        throw new Error('Failed to add video');
      }
      const newVideo: Video = await response.json();
      setVideos((prev) => [newVideo, ...prev]);
    } catch (error) {
      console.error('Error adding video:', error);
      throw error;
    }
  };

  // Delete a video using the backend DELETE endpoint
  const deleteVideo = async (id: number) => {
    
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete video');
      }
      setVideos((prev) => prev.filter((video) => video.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const upvoteVideo = (id: number) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, upvotes: video.upvotes + 1 } : video
      )
    );
  };
  
  const downvoteVideo = (id: number) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, downvotes: video.downvotes + 1 } : video
      )
    );
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider 
    value={{     
      videos,
      fetchVideos,
      addVideo,
      deleteVideo,
      upvoteVideo,
      downvoteVideo, 
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};
