import React from 'react';

const Logo: React.FC<{ className?: string, variant?: 'light' | 'dark' }> = ({ className, variant = 'dark' }) => {
  return (
    <div className={`flex items-center group ${className}`}>
      <div className="relative h-12 md:h-16 flex items-center justify-center transition-transform group-hover:scale-105">
        <img 
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Jacobs Design Solutions"
          className={`h-full w-auto object-contain ${variant === 'light' ? 'brightness-0 invert' : ''}`}
        />
      </div>
    </div>
  );
};

export default Logo;
