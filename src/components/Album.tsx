import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CircularProgress from './CircularProgress'; // Import CircularProgress

interface AlbumProps {
  cover: string;
  title: string;
  artist: string;
  audioSrc: string;
  onPlay: () => void;
  isPlaying: boolean;
  onVolumeChange: (volume: number) => void;
}

const Album: React.FC<AlbumProps> = ({ cover, title, artist, audioSrc, onPlay, isPlaying, onVolumeChange }) => {
  const [volume, setVolume] = useState(1); // Local volume state
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.addEventListener('error', handleError);
      audio.volume = volume; // Set volume on mount
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.removeEventListener('error', handleError);
      }
    };
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        onPlay(); // Notify parent to pause other players
        audioRef.current.play().catch(handleError);
      }
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleError = (e: Event | string) => {
    console.error('Audio playback error:', e);
    setError("An error occurred while playing the audio.");
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume); // Notify parent about volume change
  };

  return (
    <motion.div
      className="w-full h-full text-gray-600 rounded-lg shadow-lg overflow-hidden relative"
      initial={{ opacity: 0, scale: 1.2 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={cover} alt={title} className="w-full h-full object-cover" />
      <CircularProgress
        duration={duration}
        currentTime={progress}
        onPlayPause={togglePlay}
        isPlaying={isPlaying}
        style={{ position: 'absolute', bottom: '10px', right: '10px' }} // Positioning
      />
      <div className="p-4">
        <h3 className="text-lg text-white font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{artist}</p>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full mt-2"
        />
      </div>
      <audio ref={audioRef} src={audioSrc} />
    </motion.div>
  );
};

export default Album;
