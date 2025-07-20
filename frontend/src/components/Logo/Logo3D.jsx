import React from 'react';

const Logo3D = ({ size = 'md' }) => {
  const sizes = {
    sm: { container: 'w-16 h-16', viewBox: '0 0 200 200', scale: 0.5 },
    md: { container: 'w-24 h-24', viewBox: '0 0 300 300', scale: 0.75 },
    lg: { container: 'w-96 h-96 lg:w-[500px] lg:h-[500px]', viewBox: '0 0 400 400', scale: 1 }
  };

  const currentSize = sizes[size];

  return (
    <div className={`relative ${currentSize.container} mx-auto floating-element`}>
      <svg
        viewBox={currentSize.viewBox}
        className="w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Définitions des gradients */}
        <defs>
          <linearGradient id={`diamondGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="30%" stopColor="#0891b2" />
            <stop offset="70%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#164e63" />
          </linearGradient>
          
          <linearGradient id={`sparkleGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          
          <linearGradient id={`cleanWave-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          
          <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id={`innerGlow-${size}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Conteneur principal */}
        <g filter={`url(#glow-${size})`} transform={`scale(${currentSize.scale}) translate(${size === 'sm' ? '100,100' : size === 'md' ? '50,50' : '0,0'})`}>
          
          {/* Diamant principal - représente la pureté des données nettoyées */}
          <g transform="translate(200,200)">
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              values="0 0 0;360 0 0" 
              dur="12s" 
              repeatCount="indefinite"
            />
            
            {/* Facettes du diamant */}
            <polygon
              points="0,-60 40,-20 0,60 -40,-20"
              fill={`url(#diamondGradient-${size})`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              filter={`url(#innerGlow-${size})`}
            />
            
            {/* Reflets du diamant */}
            <polygon
              points="0,-60 20,-40 0,-10 -20,-40"
              fill="rgba(255,255,255,0.4)"
              opacity="0.8"
            >
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </polygon>
            
            <polygon
              points="0,10 30,30 0,60 -30,30"
              fill="rgba(255,255,255,0.2)"
              opacity="0.6"
            >
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
            </polygon>
          </g>
          
          {/* Ondes de nettoyage qui se propagent */}
          <g>
            <circle cx="200" cy="200" r="80" fill="none" stroke={`url(#cleanWave-${size})`} strokeWidth="3" opacity="0.6">
              <animate attributeName="r" values="80;120;80" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="4s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="200" cy="200" r="100" fill="none" stroke={`url(#cleanWave-${size})`} strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values="100;140;100" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.05;0.4" dur="5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Particules de données qui orbitent */}
          <g>
            {/* Données sales qui se transforment */}
            <circle cx="120" cy="200" r="3" fill="#ef4444">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 200 200;360 200 200" 
                dur="6s" 
                repeatCount="indefinite"
              />
              <animate attributeName="fill" values="#ef4444;#f59e0b;#10b981" dur="6s" repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur="6s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="280" cy="200" r="3" fill="#ef4444">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 200 200;360 200 200" 
                dur="8s" 
                repeatCount="indefinite"
              />
              <animate attributeName="fill" values="#ef4444;#f59e0b;#10b981" dur="8s" repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur="8s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="200" cy="120" r="3" fill="#ef4444">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 200 200;360 200 200" 
                dur="7s" 
                repeatCount="indefinite"
              />
              <animate attributeName="fill" values="#ef4444;#f59e0b;#10b981" dur="7s" repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur="7s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="200" cy="280" r="3" fill="#ef4444">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 200 200;360 200 200" 
                dur="9s" 
                repeatCount="indefinite"
              />
              <animate attributeName="fill" values="#ef4444;#f59e0b;#10b981" dur="9s" repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur="9s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Étoiles scintillantes - représentent la qualité */}
          <g fill={`url(#sparkleGradient-${size})`}>
            <g transform="translate(150,150)">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 0 0;360 0 0" 
                dur="10s" 
                repeatCount="indefinite"
              />
              <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </polygon>
            </g>
            
            <g transform="translate(250,150)">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 0 0;-360 0 0" 
                dur="8s" 
                repeatCount="indefinite"
              />
              <polygon points="0,-6 1.5,-1.5 6,0 1.5,1.5 0,6 -1.5,1.5 -6,0 -1.5,-1.5" opacity="0.7">
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" repeatCount="indefinite" />
              </polygon>
            </g>
            
            <g transform="translate(250,250)">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 0 0;360 0 0" 
                dur="12s" 
                repeatCount="indefinite"
              />
              <polygon points="0,-5 1,-1 5,0 1,1 0,5 -1,1 -5,0 -1,-1" opacity="0.6">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
              </polygon>
            </g>
            
            <g transform="translate(150,250)">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0 0 0;-360 0 0" 
                dur="14s" 
                repeatCount="indefinite"
              />
              <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" opacity="0.5">
                <animate attributeName="opacity" values="0.1;0.8;0.1" dur="3s" repeatCount="indefinite" />
              </polygon>
            </g>
          </g>
          
          {/* Lettre D stylisée au centre du diamant */}
          <text
            x="200"
            y="210"
            textAnchor="middle"
            className="fill-white font-bold"
            style={{ fontSize: '28px', fontFamily: 'Inter, sans-serif', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
          >
            D
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo3D;

