
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', withText = false }) => {
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-40 h-40'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${dimensions[size]} relative`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer Ring */}
          <circle cx="100" cy="100" r="85" stroke="#5C3D2E" strokeWidth="8" />
          <circle cx="100" cy="100" r="75" stroke="#5C3D2E" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
          
          {/* Steam */}
          <path d="M90 60 Q95 50 90 40" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M100 55 Q105 45 100 35" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M110 60 Q115 50 110 40" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

          {/* Rice mounds */}
          <circle cx="75" cy="95" r="25" fill="#FFFFFF" />
          <circle cx="100" cy="85" r="30" fill="#FFFFFF" />
          <circle cx="125" cy="95" r="25" fill="#FFFFFF" />
          
          {/* House icon in rice */}
          <path d="M90 95 L100 85 L110 95 V105 H90 V95 Z" fill="#5C3D2E" />
          <rect x="97" y="98" width="6" height="7" fill="#FFB800" opacity="0.6" />

          {/* Bowl */}
          <path d="M45 105 C45 105 45 145 100 145 C155 145 155 105 155 105 H45 Z" fill="#FF7A00" />
          <path d="M45 105 H155" stroke="#E66E00" strokeWidth="2" />
          <path d="M85 145 L90 155 H110 L115 145" fill="#E66E00" />
          
          {/* Chopsticks */}
          <rect x="135" y="45" width="6" height="80" rx="3" transform="rotate(35 135 45)" fill="#5C3D2E" />
          <rect x="150" y="55" width="6" height="80" rx="3" transform="rotate(35 150 55)" fill="#5C3D2E" />
        </svg>
      </div>
      {withText && (
        <div className="mt-4 text-center">
          <h2 className={`font-title font-black text-brand-brown-900 leading-none ${size === 'xl' ? 'text-5xl' : 'text-2xl'}`}>Cơm Nhà</h2>
          <p className={`font-body font-bold text-brand-brown-500 uppercase tracking-widest mt-1 ${size === 'xl' ? 'text-base' : 'text-[10px]'}`}>Bếp Ấm - Vị Nhà</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
