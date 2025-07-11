import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface StackItem {
  id: number;
  title: string;
  image: string;
  description?: string;
}

interface DraggableStackProps {
  items: StackItem[];
  width?: number;
  height?: number;
  sensitivity?: number;
  randomRotation?: boolean;
  className?: string;
}

export const DraggableStack: React.FC<DraggableStackProps> = ({
  items,
  width = 250,
  height = 200,
  sensitivity = 10,
  randomRotation = true,
  className = ''
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [positions, setPositions] = useState<{ [key: number]: { x: number; y: number; rotation: number } }>({});
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  const getInitialRotation = (index: number) => {
    if (!randomRotation) return 0;
    return (Math.random() - 0.5) * 20; // Random rotation between -10 and 10 degrees
  };

  const handleMouseDown = (e: React.MouseEvent, itemId: number) => {
    const currentPos = positions[itemId] || { x: 0, y: 0, rotation: getInitialRotation(itemId) };
    
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentPos.x,
      initialY: currentPos.y
    };
    
    setDraggedItem(itemId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedItem === null || !dragRef.current) return;

    const deltaX = (e.clientX - dragRef.current.startX) / sensitivity;
    const deltaY = (e.clientY - dragRef.current.startY) / sensitivity;
    
    const newX = dragRef.current.initialX + deltaX;
    const newY = dragRef.current.initialY + deltaY;
    const rotation = deltaX * 0.1; // Slight rotation based on horizontal movement

    setPositions(prev => ({
      ...prev,
      [draggedItem]: {
        x: newX,
        y: newY,
        rotation: (prev[draggedItem]?.rotation || 0) + rotation
      }
    }));
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
    dragRef.current = null;
  };

  return (
    <div 
      className={`draggable-stack ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {items.map((item, index) => {
        const position = positions[item.id] || { x: 0, y: 0, rotation: getInitialRotation(index) };
        const zIndex = draggedItem === item.id ? 1000 : items.length - index;
        
        return (
          <Card
            key={item.id}
            className="stack-card"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
              zIndex,
              cursor: draggedItem === item.id ? 'grabbing' : 'grab'
            }}
            onMouseDown={(e) => handleMouseDown(e, item.id)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-3/4 object-cover"
              />
              <div className="p-3 bg-white">
                <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          </Card>
        );
      })}
      
      <style>{`
        .draggable-stack {
          position: relative;
          width: ${width}px;
          height: ${height}px;
          margin: 0 auto;
        }
        
        .stack-card {
          position: absolute;
          top: 0;
          left: 0;
          user-select: none;
          transition: transform 0.2s ease-out;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border: 1px solid hsl(var(--border));
        }
        
        .stack-card:hover {
          transform: translate(var(--x, 0), var(--y, 0)) rotate(var(--rotation, 0deg)) scale(1.05) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
        }
        
        .stack-card:nth-child(odd) {
          top: ${Math.random() * 10}px;
          left: ${Math.random() * 10}px;
        }
      `}</style>
    </div>
  );
};
