import React from 'react';

const Logo3DBlue = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 'w-16 h-16', text: 'text-lg' },
    md: { icon: 'w-32 h-32', text: 'text-xl' },
    lg: { icon: 'w-48 h-48', text: 'text-2xl' },
    xl: { icon: 'w-80 h-80', text: 'text-3xl' }
  };

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* Logo D avec Typographie Créative */}
      <div className={`${sizes[size].icon} relative`}>
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients pour l'effet 3D */}
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#dbeafe" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="80%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            
            <radialGradient id="highlight" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            
            {/* Filtre pour l'effet de lueur */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Lettre D avec Style Calligraphique */}
          <g transform="translate(200,200)" filter="url(#glow)">
            
            {/* Ombre de la lettre */}
            <path
              d="M -60 -120 
                 C -70 -125, -80 -120, -80 -110
                 L -80 110
                 C -80 120, -70 125, -60 120
                 L 40 120
                 C 90 120, 130 80, 130 30
                 L 130 20
                 C 135 15, 135 5, 130 0
                 L 130 -20
                 C 130 -80, 90 -120, 40 -120
                 C 30 -125, 20 -120, 30 -115
                 L -60 -120 Z"
              fill="rgba(29,78,216,0.3)"
              transform="translate(5,5)"
            />
            
            {/* Corps principal de la lettre D avec trou intérieur */}
            <path
              d="M -80 -120 
                 L -80 120
                 L 40 120
                 C 90 120, 130 80, 130 30
                 L 130 -30
                 C 130 -80, 90 -120, 40 -120
                 L -80 -120 Z
                 
                 M -40 -80
                 L 30 -80
                 C 60 -80, 90 -60, 90 -20
                 L 90 20
                 C 90 60, 60 80, 30 80
                 L -40 80
                 L -40 -80 Z"
              fill="url(#blueGradient)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fillRule="evenodd"
            >
              <animate attributeName="d" 
                values="M -60 -120 C -70 -125, -80 -120, -80 -110 L -80 110 C -80 120, -70 125, -60 120 L 40 120 C 90 120, 130 80, 130 30 L 130 20 C 135 15, 135 5, 130 0 L 130 -20 C 130 -80, 90 -120, 40 -120 C 30 -125, 20 -120, 30 -115 L -60 -120 Z;
                        M -62 -122 C -72 -127, -82 -122, -82 -112 L -82 112 C -82 122, -72 127, -62 122 L 42 122 C 92 122, 132 82, 132 32 L 132 22 C 137 17, 137 7, 132 2 L 132 -22 C 132 -82, 92 -122, 42 -122 C 32 -127, 22 -122, 32 -117 L -62 -122 Z;
                        M -60 -120 C -70 -125, -80 -120, -80 -110 L -80 110 C -80 120, -70 125, -60 120 L 40 120 C 90 120, 130 80, 130 30 L 130 20 C 135 15, 135 5, 130 0 L 130 -20 C 130 -80, 90 -120, 40 -120 C 30 -125, 20 -120, 30 -115 L -60 -120 Z" 
                dur="6s" 
                repeatCount="indefinite" />
            </path>
            
            {/* Reflet principal */}
            <ellipse
              cx="-20"
              cy="-50"
              rx="50"
              ry="35"
              fill="url(#highlight)"
              opacity="0.8"
            >
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
              <animate attributeName="rx" values="50;60;50" dur="3s" repeatCount="indefinite" />
            </ellipse>
            
            {/* Détails calligraphiques */}
            <path
              d="M -70 -100 C -65 -105, -60 -100, -65 -95 L -65 95 C -60 100, -65 105, -70 100 Z"
              fill="rgba(255,255,255,0.4)"
              opacity="0.7"
            >
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" />
            </path>
            
            {/* Ornements typographiques */}
            <circle cx="80" cy="-10" r="12" fill="rgba(255,255,255,0.5)" opacity="0.6">
              <animate attributeName="r" values="12;18;12" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="80" cy="10" r="8" fill="rgba(255,255,255,0.4)" opacity="0.5">
              <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
            </circle>
            
            {/* Flourishes décoratifs */}
            <path
              d="M -90 -130 C -85 -135, -80 -130, -85 -125 C -80 -120, -85 -115, -90 -120"
              fill="none"
              stroke="rgba(59,130,246,0.6)"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
            </path>
            
            <path
              d="M 140 -130 C 145 -135, 150 -130, 145 -125 C 150 -120, 145 -115, 140 -120"
              fill="none"
              stroke="rgba(29,78,216,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
            </path>
            
            <path
              d="M -90 130 C -85 135, -80 130, -85 125 C -80 120, -85 115, -90 120"
              fill="none"
              stroke="rgba(59,130,246,0.6)"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.5s" repeatCount="indefinite" />
            </path>
            
            <path
              d="M 140 130 C 145 135, 150 130, 145 125 C 150 120, 145 115, 140 120"
              fill="none"
              stroke="rgba(29,78,216,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.8s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>
      
      {showText && (
        <div className="text-center">
          <h1 className={`${sizes[size].text} font-bold text-gradient leading-none`}>
            DimaClean
          </h1>
          <p className="text-sm text-white/60 leading-none mt-2">
            Data Cleaning Pro
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo3DBlue;




