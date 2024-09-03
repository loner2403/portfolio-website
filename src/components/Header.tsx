import React from 'react';
import { motion } from 'framer-motion';
import { IoHomeOutline, IoMusicalNotesOutline, IoPersonOutline, IoMailOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from "../assets/logo1.png";

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = React.useState(true);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const navigate = useNavigate(); // Create navigate function

  const navItems = [
    { text: 'Home', icon: <IoHomeOutline />, to: () => navigate('/') }, // Navigate to home
    { text: 'Music', icon: <IoMusicalNotesOutline />, to: () => navigate('/#music') }, // Navigate to music section
    { text: 'About', icon: <IoPersonOutline />, to: () => navigate('/about') },
    { text: 'Contact', icon: <IoMailOutline />, to: () => navigate('/contact') }
  ];

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingUp = scrollTop < lastScrollTop;

    if (scrollTop === 0) {
      setShowHeader(true);
    } else if (scrollTop > 100) {
      setShowHeader(isScrollingUp);
    }

    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -50 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 bg-transparent px-2 py-1 z-50 backdrop-blur-sm"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <motion.img
          src={logo}
          alt="Logo"
          className="w-20 h-auto cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <ul className="flex space-x-2 sm:space-x-4">
          {navItems.map((item) => (
            <li key={item.text}>
              <motion.button
                onClick={item.to}
                className="flex items-center gap-2 text-slate-500 text-sm
                  px-3 py-1 rounded-full 
                  shadow-[-5px_-5px_10px_rgba(173,_216,_230,_0.6),_5px_5px_10px_rgba(255,_182,_193,_0.3)]
                  transition-all
                  hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
                  hover:text-violet-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.text}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;