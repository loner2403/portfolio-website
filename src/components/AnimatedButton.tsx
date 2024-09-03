import React, { useState, useEffect } from 'react';

interface AnimatedButtonProps {
  href: string;
  text: string;
  icon: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ href, text, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log('isHovered:', isHovered);
  }, [isHovered]);

  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '25px',
        textDecoration: 'none',
        color: '#FFFFFF',
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
        transition: 'color 0.3s ease',
        fontSize: '1.5rem', // Font size similar to header text
        fontWeight: 'bold', // Bold font weight
        letterSpacing: '0.05em', // Optional: add spacing for better readability
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className={`fa ${icon}`} style={{ marginRight: '10px', position: 'relative', zIndex: 1 }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: isHovered ? '100%' : '0%',
          backgroundColor: '#FF69B4',
          transition: 'height 0.3s ease',
          zIndex: 0,
        }}
      />
    </a>
  );
};

export default AnimatedButton;
