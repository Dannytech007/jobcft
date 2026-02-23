import React from 'react';
import { cn } from '@/utils/helpers';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo SVG - Four colorful people shapes */}
      <svg 
        viewBox="0 0 100 100" 
        className={cn(sizeClasses[size], 'flex-shrink-0')}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Left - Green */}
        <circle cx="25" cy="20" r="12" fill="#4CAF50" />
        <path 
          d="M10 45 Q10 30 25 30 Q40 30 40 45 L40 50 L10 50 Z" 
          fill="#4CAF50"
        />
        
        {/* Top Right - Blue */}
        <circle cx="75" cy="20" r="12" fill="#2196F3" />
        <path 
          d="M60 45 Q60 30 75 30 Q90 30 90 45 L90 50 L60 50 Z" 
          fill="#2196F3"
        />
        
        {/* Bottom Left - Yellow */}
        <circle cx="25" cy="75" r="12" fill="#FFC107" />
        <path 
          d="M10 55 Q10 70 25 70 Q40 70 40 55 L40 50 L10 50 Z" 
          fill="#FFC107"
        />
        
        {/* Bottom Right - Orange */}
        <circle cx="75" cy="75" r="12" fill="#FF9800" />
        <path 
          d="M60 55 Q60 70 75 70 Q90 70 90 55 L90 50 L60 50 Z" 
          fill="#FF9800"
        />
      </svg>
      
      {showText && (
        <span className={cn(
          'font-poppins font-bold text-gray-900 tracking-tight',
          textSizes[size]
        )}>
          CFT <span className="text-brand-green">Jobs</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
