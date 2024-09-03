import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format as MM:SS
};

const PopOutPlayer: React.FC<{
  album: { cover: string; title: string; artist: string; audioSrc: string };
  onClose: () => void;
  audioElement: HTMLAudioElement | null;
  setAudioElement: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<number | null>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}> = ({ album, onClose, audioElement, setIsPlaying, currentTime, setCurrentTime }) => {
  
  const handlePlayPause = () => {
    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play();
        setIsPlaying(true);
      } else {
        audioElement.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioElement) {
      setCurrentTime(audioElement.currentTime);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioElement) {
      const newTime = parseFloat(event.target.value);
      audioElement.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Ref for the pop-out player
  const popOutRef = useRef<HTMLDivElement>(null);

  // Close the pop-out player when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popOutRef.current && !popOutRef.current.contains(event.target as Node)) {
        onClose(); // Close the pop-out player
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (audioElement) {
      audioElement.ontimeupdate = handleTimeUpdate;
    }
    return () => {
      if (audioElement) {
        audioElement.ontimeupdate = null; // Clean up
      }
    };
  }, [audioElement]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div ref={popOutRef} className="bg-gray-800 rounded-lg p-6 w-80">
        <button onClick={onClose} className="text-white absolute top-2 right-2">X</button>
        <img src={album.cover} alt={album.title} className="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-semibold text-white">{album.title}</h3>
        <p className="text-sm text-gray-400">{album.artist}</p>
        
        <div className="flex justify-center items-center mt-4">
          <button onClick={handlePlayPause} className="text-white">
            {audioElement && !audioElement.paused ? 'Pause' : 'Play'}
          </button>
        </div>

        {/* Advancement Bar */}
        <input
          type="range"
          min="0"
          max={audioElement ? audioElement.duration : 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full mt-4"
        />
        <span className="text-white">
          {formatTime(currentTime)} / {audioElement ? formatTime(audioElement.duration) : '0:00'}
        </span>
      </div>
    </motion.div>
  );
};

export default PopOutPlayer;