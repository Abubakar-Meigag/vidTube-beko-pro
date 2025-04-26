
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Copyright } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tubetunes-secondary text-tubetunes-text py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Copyright size={18} /> 2025 Beko Meigag
          </h3>
          <p className="text-tubetunes-muted text-sm mt-1">All rights reserved</p>
        </div>
        
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-tubetunes-accent transition-colors">
            <Facebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-tubetunes-accent transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-tubetunes-accent transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-tubetunes-accent transition-colors">
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
