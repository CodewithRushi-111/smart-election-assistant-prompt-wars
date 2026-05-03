import React from 'react';

const Logo = ({ size = 32, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle (Soft Glow) */}
      <circle cx="20" cy="20" r="18" fill="white" fillOpacity="0.8" />
      
      {/* Finger 3 (Ring Finger) */}
      <rect x="25" y="24" width="6" height="10" rx="3" fill="#C68642" />
      
      {/* Finger 2 (Middle Finger) */}
      <rect x="17" y="20" width="6" height="14" rx="3" fill="#E0AC69" />
      
      {/* Finger 1 (Index Finger - Tallest) */}
      <rect x="9" y="16" width="6" height="18" rx="3" fill="#F1C27D" />
      
      {/* The Dark Blue Inked Mark on Index Finger Tip */}
      <rect x="11" y="17" width="2" height="7" rx="1" fill="#1E3A8A" />
      
      {/* Subtle Depth Highlights */}
      <rect x="10" y="17" width="1" height="16" rx="0.5" fill="white" fillOpacity="0.2" />
      <rect x="14" y="17" width="0.5" height="16" rx="0.25" fill="black" fillOpacity="0.05" />
    </svg>
  );
};

export default Logo;
