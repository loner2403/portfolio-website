import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicSection from './components/MusicSection';
import About from './components/About';
import Contact from './components/Contact';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App: React.FC = () => {
  return (
    
        <div className='bg-black background-transition'>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection id='hero'/>
              <MusicSection id="music" />
              <GetInTouch />
            </>
          } />
          <Route path="/about" element={
            <>
            <About />
            <GetInTouch />
          </>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
  
  );
};

export default App;
