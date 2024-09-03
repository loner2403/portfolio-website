import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScroll, useTransform, motion } from 'framer-motion';
import CircularProgress from './CircularProgress'; // Import CircularProgress
import videoSrc from '../assets/video/video1.mp4';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC<{ id?: string }> = ({}) => {
  const introRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Framer Motion hooks
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500, 1000], [1, 0.9, 1]);
  const padding = useTransform(scrollY, [0, 250, 500], ['20px', '0px', '20px']);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      video.play().catch(() => { /* Handle autoplay restrictions */ });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    gsap.to(intro, {
      y: '-100%',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: intro,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: introRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    tl.to(video, {
      scale: 0.9,
      borderRadius: '20px',
      boxShadow: '0 0 30px rgba(0,0,0,0.3)',
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Function to toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => { /* Handle autoplay restrictions */ });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      ref={introRef}
      className="intro relative h-screen overflow-hidden bg-gradient-to-b from-blue-800 to-black"
      style={{ padding: padding.get() }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src={videoSrc}
        muted
        playsInline
        loop
        autoPlay
      />
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full" style={{ transform: `scale(${scale})` }}>
        <motion.h1
          className="text-8xl font-bold mb-6 tracking-tight animate-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Akash Tripathi
        </motion.h1>
        <motion.p
          className="text-3xl font-light animate-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Musician & Composer
        </motion.p>
        <motion.p
          className="text-xl mt-4 animate-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Scroll to explore
        </motion.p>
      </div>
      <CircularProgress
        duration={duration}
        currentTime={currentTime}
        onPlayPause={togglePlay} // Pass the togglePlay function
        isPlaying={isPlaying} // Pass the isPlaying state
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          transform: 'scale(1.5)',
          transition: 'transform 0.3s ease'
        }}
      />
    </div>
  );
};

export default HeroSection;