import React, { useState, useEffect } from 'react';

interface AnimatedButtonProps {
  href: string;
  text: string;
  icon: string;
  style?: React.CSSProperties; // Allow passing additional styles
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ href, text, icon, style }) => {
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
        justifyContent: 'center', // Center the content horizontally
        padding: '10px 20px',
        borderRadius: '25px',
        textDecoration: 'none',
        color: '#FFFFFF',
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
        transition: 'color 0.3s ease',
        fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', // Responsive font size
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        width: 'clamp(100px, 30vw, 200px)', // Responsive width
        height: 'clamp(40px, 10vw, 60px)', // Responsive height
        ...style, // Apply additional styles passed as props
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className={`fa ${icon}`} style={{ marginRight: '10px', position: 'relative', zIndex: 1 }} />
      <span style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>{text}</span>
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