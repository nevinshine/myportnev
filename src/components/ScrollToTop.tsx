import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : 'hidden'}`}>
      <Button
        onClick={scrollToTop}
        size="icon"
        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
      
      <style>{`
        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 50;
          transition: var(--transition-smooth);
        }
        
        .scroll-to-top.hidden {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }
        
        .scroll-to-top.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-to-top:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
};
