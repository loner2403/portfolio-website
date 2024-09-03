import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CircularProgress from './CircularProgress';
import album1 from "../assets/album1.jpeg";
import album2 from "../assets/albun2.jpeg";
import album3 from "../assets/album3.jpeg";
import song1 from "../assets/songs/song1.mp3"; 
import song2 from "../assets/songs/song2.mp3"; 
import song3 from "../assets/songs/song3.mp3"; 
import photo1 from "../assets/akashs_1.jpeg";
import PopOutPlayer from './PopOutPlayer';

interface MusicSectionProps {
  id : string
}

const MusicSection: React.FC<MusicSectionProps> = ({ id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroSectionScrollY = 0;
  const musicSectionScrollY = 750; // Adjust this value based on the position of the Music Section
  const aboutSectionScrollY = 1000; // Adjust this value based on the position of the About Section

  const scale = useTransform(scrollY, 
    [heroSectionScrollY, musicSectionScrollY, aboutSectionScrollY], 
    [0.9, 1, 0.9] // Output values corresponding to the input ranges
  );
  const padding = useTransform(scrollY, [0, 250, 500], ['20px', '0px', '20px']); // Padding effect
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null); // State for the selected album

  const albums = [
    { cover: album1, title: 'Meri jaan', artist: 'Akash Tripathi', audioSrc: song1 },
    { cover: album2, title: 'Raho Pe', artist: 'Akash Tripathi', audioSrc: song2 },
    { cover: album3, title: 'DustBin', artist: 'Akash Tripathi', audioSrc: song3 },
  ];

  useEffect(() => {
    if(window.location.hash === `#${id}`) {
      const element = document.getElementById(id);
      if(element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (audioElement) {
      audioElement.ontimeupdate = () => {
        setCurrentTime(audioElement.currentTime);
      };

      audioElement.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0); // Reset current time when the track ends
        setCurrentlyPlaying(null); // Reset currently playing track
      };
    }
  }, [audioElement, id]);

  const handlePlay = (index: number) => {
    if (currentlyPlaying !== null && currentlyPlaying !== index) {
      audioElement?.pause();
    }

    if (currentlyPlaying === index && isPlaying) {
      audioElement?.pause();
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(albums[index].audioSrc);
      setAudioElement(newAudio);
      setCurrentlyPlaying(index);
      setIsPlaying(true);
      newAudio.play();
    }
  };

  const handleAlbumClick = (index: number) => {
    setSelectedAlbum(index); // Set the selected album for pop-out
  };

  const closePopOut = () => {
    setSelectedAlbum(null); // Close the pop-out
    setIsPlaying(false); // Stop playback when closing
    audioElement?.pause(); // Pause the audio
  };

  return (
    <section id={id}  ref={sectionRef} className='relative h-screen flex items-center justify-center overflow-hidden bg-black'>
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
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center text-white"
      >
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Music
        </motion.h2>
        <motion.div className="flex flex-wrap justify-center gap-8">
          {albums.map((album, index) => (
            <motion.div
              key={index}
              className="w-64 h-64 relative album-card transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => handleAlbumClick(index)} // Trigger pop-out on click
            >
              <img src={album.cover} alt={album.title} className="w-full h-full object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center rounded-lg">
                <h3 className="text-xl font-semibold">{album.title}</h3>
                <p className="text-sm">{album.artist}</p>
              </div>
              <CircularProgress 
                duration={audioElement?.duration || 0}
                currentTime={currentlyPlaying === index ? currentTime : 0}
                onPlayPause={() => handlePlay(index)}
                isPlaying={currentlyPlaying === index && isPlaying}
                style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Pop-Out Player */}
      {selectedAlbum !== null && (
        <PopOutPlayer 
          album={albums[selectedAlbum]} 
          onClose={closePopOut} 
          audioElement={audioElement} 
          setAudioElement={setAudioElement} 
          setCurrentlyPlaying={setCurrentlyPlaying} 
          setIsPlaying={setIsPlaying} 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime} 
        />
      )}
    </section>
  );
};

export default MusicSection;