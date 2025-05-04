import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video } from '../types/video';

interface VideoContextType {
  videos: Video[];
  fetchVideos: () => Promise<void>;
  addVideo: (title: string, youtubeId: string) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6006';
  const url = `${apiBaseUrl}/api/videos`;
   
  const [videos, setVideos] = useState<Video[]>([]);

  // Fetch all videos from the backend
  const fetchVideos = async () => {
    try {
      const response = await fetch(url); // Replace with your GET endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data: Video[] = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  // Add a new video using the backend POST endpoint
  const addVideo = async (title: string, youtubeId: string) => {
    try {
      const response = await fetch(url, {
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
    }
  };

  // Delete a video using the backend DELETE endpoint
  const deleteVideo = async (id: string) => {
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

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider value={{ videos, fetchVideos, addVideo, deleteVideo }}>
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