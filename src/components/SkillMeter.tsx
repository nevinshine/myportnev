import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface SkillMeterProps {
  skill: string;
  percentage: number;
  color?: string;
  delay?: number;
}

export const SkillMeter: React.FC<SkillMeterProps> = ({
  skill,
  percentage,
  color = 'primary',
  delay = 0
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercentage(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="skill-meter space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-sm text-muted-foreground">{currentPercentage}%</span>
      </div>
      <Progress 
        value={currentPercentage} 
        className="h-2 skill-progress"
      />
      
      <style>{`
        .skill-progress {
          transition: all 1s ease-out;
        }
        
        .skill-progress [data-orientation="horizontal"] {
          background: hsl(var(--${color}));
        }
      `}</style>
    </div>
  );
};
