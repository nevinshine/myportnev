import React from 'react';
import { Code, Lightbulb, Rocket, Heart } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  const elements = [
    { Icon: Code, delay: '0s', duration: '6s', color: 'text-primary' },
    { Icon: Lightbulb, delay: '1.5s', duration: '7s', color: 'text-accent' },
    { Icon: Rocket, delay: '3s', duration: '5s', color: 'text-primary-light' },
    { Icon: Heart, delay: '4.5s', duration: '8s', color: 'text-red-500' }
  ];

  return (
    <div className="floating-elements">
      {elements.map(({ Icon, delay, duration, color }, index) => (
        <div
          key={index}
          className={`floating-element ${color}`}
          style={{
            animationDelay: delay,
            animationDuration: duration,
            left: `${20 + index * 20}%`,
            top: `${30 + index * 15}%`
          }}
        >
          <Icon size={24} />
        </div>
      ))}
      
      <style>{`
        .floating-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .floating-element {
          position: absolute;
          opacity: 0.3;
          animation: float infinite ease-in-out;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-40px) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-20px) rotate(270deg);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};
