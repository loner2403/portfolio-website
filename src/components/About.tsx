import { motion } from 'framer-motion';
import img1 from "../assets/about/img5.jpeg";
import img2 from "../assets/about/img1.jpeg";
import img3 from "../assets/about/img2.jpeg";
import img4 from "../assets/about/img3.jpeg";
import img5 from "../assets/about/img4.jpeg";
import resume from "../assets/myresume.pdf";


const AboutSection = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'Akash_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background rotating cards code... */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="relative w-full h-full">
          {[1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              className="absolute w-40 h-60 bg-gray-800 rounded-lg shadow-lg"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              }}
            >
              {/* Add your image here */}
              <img
                src={img1}
                alt={`Rotating card ${1}`}
                className="w-full h-full object-cover "
              />
              <img
                src={img2}
                alt={`Rotating card ${2}`}
                className="w-full h-full object-cover "
              />
              <img
                src={img3}
                alt={`Rotating card ${3}`}
                className="w-full h-full object-cover "
              />
              <img
                src={img4}
                alt={`Rotating card ${4}`}
                className="w-full h-full object-cover "
              />
              <img
                src={img5}
                alt={`Rotating card ${5}`}
                className="w-full h-full object-cover "
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen p-8">
        {/* Left side content code... */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center mb-8 md:mb-0">
          <button
            onClick={handleDownload}
            className="group relative focus:outline-none"
            aria-label="Download Resume"
          >
            <motion.svg
              className="w-64 h-64 text-pink-500 cursor-pointer transition-all duration-300 ease-in-out group-hover:text-pink-400 group-hover:scale-105"
              viewBox="0 0 24 24"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            >
              <title>Musical Note</title>
              <path
                fill="currentColor"
                d="M14 2v12.5c-.7-.3-1.5-.5-2.3-.5-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5V6h3V2h-5.2zm-2.3 19c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"
              />
            </motion.svg>
          </button>
          
          <motion.p
            className="mt-4 text-sm text-gray-400 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Click the musical note to download my resume!
          </motion.p>
        </div>
        
        <div className="w-full md:w-1/2 space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-pink-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Akash Tripathi
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
           I'm a Mumbai-based multifaceted musician, blending hip-hop, indie-pop, EDM, and Bollywood vibes into my unique sonic palette. As a lyricist, music producer, rapper, and singer, I craft captivating melodies and weave rhythmic narratives that resonate with diverse audiences. Join me on my musical odyssey of innovation and exploration, where each composition invites you into a world of rhythmic creativity and melodic artistry.
          </motion.p>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-pink-400">Specialties</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Composition for Film and TV</li>
              <li>Live Performance</li>
              <li>Studio Recording</li>
              <li>Music Production</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default AboutSection;