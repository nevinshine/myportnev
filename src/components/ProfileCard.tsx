import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import avatarImage from '@/assets/avatar.jpg';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactEmail: string;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactEmail,
  className = ''
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <Card 
      className={`profile-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      <div className="p-8 text-center space-y-6">
        <div className="relative inline-block">
          <img 
            src={avatarImage} 
            alt={name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-foreground">{name}</h3>
          <p className="text-lg text-muted-foreground">{title}</p>
          <p className="text-sm text-primary">{handle}</p>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">{status}</span>
        </div>
        
        <Button 
          onClick={() => window.open(`mailto:${contactEmail}`, '_blank')}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Get in Touch
        </Button>
      </div>
      
      <style>{`
        .profile-card {
          background: linear-gradient(145deg, hsl(var(--card)), hsl(var(--muted)));
          box-shadow: var(--portfolio-shadow);
          border: 1px solid hsl(var(--border));
          backdrop-filter: blur(10px);
          transition: var(--transition-smooth);
        }
        
        .profile-card:hover {
          box-shadow: var(--portfolio-glow);
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-8px) !important;
        }
      `}</style>
    </Card>
  );
};
