
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  onAddVideoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddVideoClick }) => {
  return (
    <header className="w-full flex justify-between items-center p-4 z-10 relative">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-tubetunes-accent">BEKO VidTube</h1>
      </div>
      <Button 
        onClick={onAddVideoClick}
        className="bg-tubetunes-accent hover:bg-tubetunes-accent/80 text-white flex items-center gap-2"
      >
        <Plus size={18} />
        Add Video
      </Button>
    </header>
  );
};

export default Header;
