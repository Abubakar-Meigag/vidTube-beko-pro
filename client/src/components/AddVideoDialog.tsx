
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AddVideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (url: string, title: string) => void;
}

const AddVideoDialog: React.FC<AddVideoDialogProps> = ({ isOpen, onClose, onAddVideo }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl || !videoTitle) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const youtubeId = extractYouTubeId(videoUrl);
    if (!youtubeId) {
      toast.error('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      onAddVideo(videoUrl, videoTitle);
      setVideoUrl('');
      setVideoTitle('');
      setIsLoading(false);
      onClose();
      toast.success('Video added successfully!');
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-tubetunes-secondary text-tubetunes-text border-tubetunes-accent">
        <DialogHeader>
          <DialogTitle className="text-tubetunes-accent">Add New Video</DialogTitle>
          <DialogDescription>
            Add your favorite YouTube video to the collection.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Video Title</Label>
            <Input
              id="title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Enter video title"
              className="bg-tubetunes-background border-tubetunes-muted"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">YouTube URL</Label>
            <Input
              id="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="bg-tubetunes-background border-tubetunes-muted"
              required
            />
            <p className="text-xs text-tubetunes-muted">
              Paste the full YouTube video URL
            </p>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              onClick={onClose}
              variant="outline"
              className="bg-transparent border-tubetunes-muted text-tubetunes-muted hover:bg-tubetunes-background"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-tubetunes-accent hover:bg-tubetunes-accent/80 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Video'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVideoDialog;
