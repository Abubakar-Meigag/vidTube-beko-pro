
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FeaturedVideo from '../components/FeaturedVideo';
import VideoGrid from '../components/VideoGrid';
import VideoPlayer from '../components/VideoPlayer';
import AddVideoDialog from '../components/AddVideoDialog';
import { Video } from '../types/video';
import { initialVideos } from '../data/initialVideos';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  
  // Auto-rotate when no video is selected
  useEffect(() => {
    if (!currentVideo && videos.length > 0) {
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * videos.length);
        setCurrentVideo(videos[randomIndex]);
      }, 60000); // Change every 60 seconds
      
      return () => clearInterval(intervalId);
    }
  }, [currentVideo, videos]);
  
  // Local storage operations
  useEffect(() => {
    // Load videos from local storage on mount
    const storedVideos = localStorage.getItem('tubeTunesVideos');
    if (storedVideos) {
      try {
        setVideos(JSON.parse(storedVideos));
      } catch (error) {
        console.error('Failed to parse stored videos:', error);
      }
    }
  }, []);
  
  // Save videos to local storage when they change
  useEffect(() => {
    localStorage.setItem('tubeTunesVideos', JSON.stringify(videos));
  }, [videos]);

  const handleAddVideo = (url: string, title: string) => {
    // Extract YouTube ID
    const youtubeId = extractYouTubeId(url);
    
    if (!youtubeId) {
      toast.error('Invalid YouTube URL');
      return;
    }
    
    // Create new video object
    const newVideo: Video = {
      id: Date.now().toString(),
      title,
      youtubeId,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`,
      channelName: 'Added by User',
      upvotes: 0,
      downvotes: 0,
      views: 0
    };
    
    setVideos(prev => [newVideo, ...prev]);
    toast.success('Video added successfully!');
  };
  
  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(video => video.id !== id));
    
    if (currentVideo?.id === id) {
      setCurrentVideo(null);
    }
    
    toast.success('Video deleted');
  };
  
  const handleUpvote = (id: string) => {
    setVideos(prev => 
      prev.map(video => 
        video.id === id ? { ...video, upvotes: video.upvotes + 1 } : video
      )
    );
  };
  
  const handleDownvote = (id: string) => {
    setVideos(prev => 
      prev.map(video => 
        video.id === id ? { ...video, downvotes: video.downvotes + 1 } : video
      )
    );
  };
  
  const handlePlayVideo = (video: Video) => {
    setCurrentVideo(video);
    
    // Increment views
    setVideos(prev => 
      prev.map(v => 
        v.id === video.id ? { ...v, views: v.views + 1 } : v
      )
    );
    
    // Scroll to top if on mobile
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Helper function to extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Sort videos by views for featured section
  const featuredVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddVideoClick={() => setIsAddVideoOpen(true)} />
      
      <main className="flex-1 container mx-auto px-4 pb-8">
        {/* Featured Area */}
        <section className="mb-8">
          {currentVideo ? (
            <VideoPlayer currentVideo={currentVideo} />
          ) : (
            <FeaturedVideo videos={featuredVideos} onPlay={handlePlayVideo} />
          )}
        </section>
        
        {/* Search and Filter */}
        <section className="mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-tubetunes-text">Video Library</h2>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tubetunes-muted" size={16} />
              <Input
                placeholder="Search videos..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-9 bg-tubetunes-secondary border-tubetunes-muted"
              />
            </div>
          </div>
        </section>
        
        {/* Spotlight Videos section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-tubetunes-accent">SPOTLIGHT VIDEOS</h3>
            <Button variant="ghost" className="text-tubetunes-muted hover:text-tubetunes-text">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </div>
          
          <VideoGrid
            videos={videos}
            onPlay={handlePlayVideo}
            onDelete={handleDeleteVideo}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
            currentVideoId={currentVideo?.id}
            filter={searchFilter}
          />
        </section>
      </main>
      
      {/* Add Video Dialog */}
      <AddVideoDialog
        isOpen={isAddVideoOpen}
        onClose={() => setIsAddVideoOpen(false)}
        onAddVideo={handleAddVideo}
      />
    </div>
  );
};

export default Index;
