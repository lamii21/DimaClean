import React from 'react';
import Logo3D from './Logo3D';

const Logo = ({ size = 'md', showText = true, className = '', use3D = false }) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg' },
    md: { icon: 'w-10 h-10', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl' }
  };

  if (use3D) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <Logo3D size={size} />
        {showText && (
          <div>
            <h1 className={`${sizes[size].text} font-bold text-gradient leading-none`}>
              DimaClean
            </h1>
            <p className="text-xs text-white/60 leading-none mt-1">
              Data Cleaning Pro
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo 3D Letter D */}
      <div className={`${sizes[size].icon} relative`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients pour l'effet 3D */}
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="30%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            
            <linearGradient id="lightBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            
            <linearGradient id="darkBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            
            {/* Filtre pour l'effet de brillance */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="innerGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Lettre D 3D */}
          <g transform="translate(50,50)" filter="url(#glow)">
            {/* Ombre de la lettre D */}
            <path
              d="M -18 -25 L -18 25 L 5 25 C 15 25 22 18 22 8 L 22 -8 C 22 -18 15 -25 5 -25 Z"
              fill="url(#darkBlue)"
              transform="translate(2,2)"
              opacity="0.3"
            />
            
            {/* Corps principal de la lettre D */}
            <path
              d="M -18 -25 L -18 25 L 5 25 C 15 25 22 18 22 8 L 22 -8 C 22 -18 15 -25 5 -25 Z"
              fill="url(#blueGradient)"
              filter="url(#innerGlow)"
            />
            
            {/* Reflet supérieur */}
            <path
              d="M -18 -25 L -18 -15 L 5 -15 C 12 -15 18 -12 18 -8 L 18 -18 C 18 -22 12 -25 5 -25 Z"
              fill="url(#lightBlue)"
              opacity="0.8"
            >
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </path>
            
            {/* Reflet latéral */}
            <ellipse
              cx="-12"
              cy="0"
              rx="3"
              ry="20"
              fill="rgba(147, 197, 253, 0.6)"
              opacity="0.7"
            >
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
            </ellipse>
            
            {/* Brillance centrale */}
            <ellipse
              cx="8"
              cy="-5"
              rx="8"
              ry="12"
              fill="rgba(255, 255, 255, 0.3)"
              opacity="0.5"
            >
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
            </ellipse>
            
            {/* Particules brillantes */}
            <circle cx="-10" cy="-15" r="1.5" fill="#93c5fd" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="15" cy="10" r="1" fill="#60a5fa" opacity="0.6">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="0.5;1.5;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="5" cy="-20" r="0.8" fill="#93c5fd" opacity="0.7">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
      
      {showText && (
        <div>
          <h1 className={`${sizes[size].text} font-bold text-gradient leading-none`}>
            DimaClean
          </h1>
          <p className="text-xs text-white/60 leading-none mt-1">
            Data Cleaning Pro
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;








