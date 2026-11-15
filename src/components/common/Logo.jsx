import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', showText = true, link = true }) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', text: 'text-lg' },
    md: { box: 'w-8 h-8', text: 'text-xl' },
    lg: { box: 'w-10 h-10', text: 'text-2xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Instagram Story Gradient Style Pin Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${currentSize.box} transition-transform duration-200 group-hover:scale-105`}>
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="igOrangeGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Location Pin */}
          <path
            d="M24 4C14.0589 4 6 12.0589 6 22C6 32.5 21.6 43.1 23.1 44.1C23.65 44.47 24.35 44.47 24.9 44.1C26.4 43.1 42 32.5 42 22C42 12.0589 33.9411 4 24 4Z"
            fill="url(#igOrangeGrad)"
          />

          {/* Clean White Pediment */}
          <path d="M24 13L33 18.5H15L24 13Z" fill="#FFFFFF" />
          <rect x="14" y="18.5" width="20" height="1.8" rx="0.5" fill="#FFFFFF" />

          {/* Pillars */}
          <rect x="17" y="21.5" width="2.4" height="6.5" rx="0.7" fill="#FFFFFF" />
          <rect x="22.8" y="21.5" width="2.4" height="6.5" rx="0.7" fill="#FFFFFF" />
          <rect x="28.6" y="21.5" width="2.4" height="6.5" rx="0.7" fill="#FFFFFF" />

          {/* Pedestal Base */}
          <rect x="15" y="29" width="18" height="2.2" rx="0.8" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight text-white ${currentSize.text}`}>
              Civic<span className="text-brand-500">Sense</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-ig-card text-brand-500 rounded border border-ig-border">
              NCR
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link to="/" className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
