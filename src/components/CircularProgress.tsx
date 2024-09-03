import React from 'react';

interface CircularProgressProps {
  duration: number;
  currentTime: number;
  onPlayPause: () => void;
  isPlaying: boolean;
  style?: React.CSSProperties;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ duration, currentTime, onPlayPause, isPlaying, style }) => {
  const strokeDashoffset = isNaN(duration) || isNaN(currentTime) || duration === 0 
    ? 0 
    : 283 - (currentTime / duration) * 283;

  return (
    <div onClick={onPlayPause} style={style}>
      <svg width="50" height="50" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          strokeDasharray="283"
          strokeDashoffset={strokeDashoffset}
        />
        {isPlaying ? (
          <g>
            <rect x="35" y="35" width="10" height="30" fill="#ffffff" />
            <rect x="55" y="35" width="10" height="30" fill="#ffffff" />
          </g>
        ) : (
          <polygon points="40,30 65,50 40,70" fill="#ffffff" />
        )}
      </svg>
    </div>
  );
};

export default CircularProgress;