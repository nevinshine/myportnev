import React from 'react';

interface CurvedLoopProps {
  text: string;
  speed?: number;
  curve?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export const CurvedLoop: React.FC<CurvedLoopProps> = ({
  text,
  speed = 20,
  curve = 10,
  direction = 'up',
  className = ''
}) => {
  const animationDirection = direction === 'up' ? 'scroll-up' : 'scroll-down';
  
  return (
    <div className={`curved-loop-container ${className}`}>
      <div 
        className={`curved-loop ${animationDirection}`}
        style={{
          animationDuration: `${speed}s`,
          transform: `perspective(500px) rotateY(${curve}deg)`
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="curved-text">
            {text}
          </div>
        ))}
      </div>
      
      <style>{`
        .curved-loop-container {
          position: fixed;
          left: 20px;
          top: 0;
          height: 100vh;
          width: 200px;
          overflow: hidden;
          pointer-events: none;
          z-index: 10;
        }
        
        .curved-loop {
          height: 200%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        .scroll-up {
          animation-name: scrollUp;
        }
        
        .scroll-down {
          animation-name: scrollDown;
        }
        
        .curved-text {
          font-size: 1.5rem;
          font-weight: 600;
          color: hsl(var(--primary));
          opacity: 0.7;
          white-space: nowrap;
          transform-origin: center;
        }
        
        @keyframes scrollUp {
          from { transform: translateY(100vh) perspective(500px) rotateY(${curve}deg); }
          to { transform: translateY(-100vh) perspective(500px) rotateY(${curve}deg); }
        }
        
        @keyframes scrollDown {
          from { transform: translateY(-100vh) perspective(500px) rotateY(${curve}deg); }
          to { transform: translateY(100vh) perspective(500px) rotateY(${curve}deg); }
        }
        
        @media (max-width: 640px) {
          .curved-loop-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
