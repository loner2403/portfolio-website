import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import album1 from "../assets/album1.jpeg";
import album2 from "../assets/albun2.jpeg";
import album3 from "../assets/album3.jpeg";
import song1 from "../assets/songs/song1.mp3"; 
import song2 from "../assets/songs/song2.mp3"; 
import song3 from "../assets/songs/song3.mp3"; 
import photo1 from "../assets/akashs_1.jpeg";
import PopOutPlayer from './PopOutPlayer';

interface MusicSectionProps {
  id: string;
}

const MusicSection: React.FC<MusicSectionProps> = ({ id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroSectionScrollY = 0;
  const musicSectionScrollY = 750; 
  const aboutSectionScrollY = 1000; 

  const scale = useTransform(scrollY, 
    [heroSectionScrollY, musicSectionScrollY, aboutSectionScrollY], 
    [0.9, 1, 0.9]
  );
  const padding = useTransform(scrollY, [0, 250, 500], ['20px', '0px', '20px']);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  const albums = [
    { cover: album1, title: 'Meri jaan', artist: 'Akash Tripathi', audioSrc: song1 },
    { cover: album2, title: 'Raho Pe', artist: 'Akash Tripathi', audioSrc: song2 },
    { cover: album3, title: 'DustBin', artist: 'Akash Tripathi', audioSrc: song3 },
  ];

  useEffect(() => {
    const newAudioElements = albums.map(album => {
      const audio = new Audio(album.audioSrc);
      audio.preload = 'metadata'; // Ensure metadata is preloaded
      return audio;
    });
    setAudioElements(newAudioElements);

    return () => {
      newAudioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const handlePlay = async (index: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }

    const audio = audioElements[index];
    if (!audio) return;

    if (currentlyPlaying !== null && currentlyPlaying !== index) {
      audioElements[currentlyPlaying].pause();
      audioElements[currentlyPlaying].currentTime = 0;
    }

    if (currentlyPlaying === index && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setCurrentlyPlaying(index);
      setIsPlaying(true);
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  const handleAlbumClick = (index: number) => {
    setSelectedAlbum(index);
  };

  const closePopOut = () => {
    if (currentlyPlaying !== null) {
      const audio = audioElements[currentlyPlaying];
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    }
    setSelectedAlbum(null);
    setCurrentTime(0);
  };

  return (
    <section id={id} ref={sectionRef} className='relative min-h-screen flex items-center justify-center overflow-hidden bg-black'>
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${photo1})`,
          scale,
          padding,
          boxSizing: 'border-box',
          transition: 'padding 0.3s ease',
        }}
      />
      <motion.div className="relative z-10 flex flex-col items-center justify-center text-center text-white w-full max-w-md mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Music
        </motion.h2>
        <motion.div className="w-full">
          {albums.map((album, index) => (
            <motion.div
              key={index}
              className="flex items-center p-4 border-b border-gray-700 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleAlbumClick(index)}
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{album.title}</h3>
                <p className="text-sm text-gray-400">{album.artist}</p>
              </div>
              <button 
                className="ml-4 p-2 bg-pink-500 rounded-full"
                onClick={(e) => handlePlay(index, e)}
              >
                {currentlyPlaying === index && isPlaying ? 'Pause' : 'Play'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {selectedAlbum !== null && (
  <PopOutPlayer 
    album={albums[selectedAlbum]} 
    onClose={closePopOut} 
    audioElement={audioElements[selectedAlbum]}
    currentlyPlaying={currentlyPlaying} // Ensure this prop is passed
    setCurrentlyPlaying={setCurrentlyPlaying} 
    setIsPlaying={setIsPlaying} 
    currentTime={currentTime} 
    setCurrentTime={setCurrentTime} 
    handlePlay={() => handlePlay(selectedAlbum)} // If needed
  />
)}
    </section>
  );
};

export default MusicSection;