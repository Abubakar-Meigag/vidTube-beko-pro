import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedVideo from '../components/FeaturedVideo';
import VideoGrid from '../components/VideoGrid';
import VideoPlayer from '../components/VideoPlayer';
import AddVideoDialog from '../components/AddVideoDialog';
import { Video } from '../types/video';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useVideoContext } from '@/context/VideoContext';

const Index: React.FC = () => {
  const { videos, addVideo, deleteVideo, upvoteVideo, downvoteVideo } = useVideoContext();
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);

  
   // Set current video when videos are loaded
   useEffect(() => {
    if (videos.length > 0) {
      setCurrentVideo(videos[0]);
    }
  }, [videos]);
  
  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * videos.length);
      setCurrentVideo(videos[randomIndex]);
    }, 60000);
  
    return () => clearInterval(intervalId);

  }, [videos]);
  
    const handleAddVideo = async (url: string, title: string) => {
    try {
      await addVideo(title, url);
      toast.success('Video added successfully!');
      setIsAddVideoOpen(false);
      window.location.href = "/"
    } catch (error) {
      toast.error('Failed to add video');
    }
  };
  
  const handleUpvote = (id: number) => {
    upvoteVideo(id);
    toast.success('Video liked');
  };
  
  const handleDownvote = (id: number) => {
       downvoteVideo(id);
       toast.success('Video disliked');
  };
  
  const handlePlayVideo = (video: Video) => {
    setCurrentVideo(video);

    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const featuredVideos = Array.isArray(videos) ? [...videos].sort((a, b) => b.views - a.views).slice(0, 4) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAddVideoClick={() => setIsAddVideoOpen(true)} />
      
      <main className="flex-1 container mx-auto px-4 pb-8">
        <section className="mb-8">
          {currentVideo ? (
            <VideoPlayer currentVideo={currentVideo} />
          ) : (
            <FeaturedVideo videos={featuredVideos} onPlay={handlePlayVideo} />
          )}
        </section>
        
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
            onDelete={deleteVideo}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
            currentVideoId={currentVideo?.id}
            filter={searchFilter}
          />
        </section>
      </main>
      
      <Footer />
      
      <AddVideoDialog
        isOpen={isAddVideoOpen}
        onClose={() => setIsAddVideoOpen(false)}
        onAddVideo={handleAddVideo}
      />
    </div>
  );
  };

export default Index;
