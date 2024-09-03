import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from './AnimatedButton';

const GetInTouch: React.FC = () => {
    const email = "info@dennissnellenberg.com";
    const phone = "+91 7989626247";
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / maxScroll;

        // Adjust the calculation to fit the button within the shortened line range
        const newLeftPosition = scrollPercent * (100 - 8); // 4% total offset (2% each side)

        setScrollPosition(newLeftPosition);
    };

    useEffect(() => {
        const updatePosition = () => {
            requestAnimationFrame(() => {
                handleScroll();
            });
        };

        window.addEventListener('scroll', updatePosition);
        return () => window.removeEventListener('scroll', updatePosition);
    }, []);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isHovered) return;
            const rect = button.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left - rect.width / 2,
                y: e.clientY - rect.top - rect.height / 2,
            });
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            setTimeout(() => setMousePosition({ x: 0, y: 0 }), 300);
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isHovered]);

    return (
        <div style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            minHeight: '100vh', // Ensure content fits within one viewport
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            position: 'relative',
        }}>
            {/* Horizontal Line */}
            <div style={{
                position: 'absolute',
                top: '50%',  // Center the line vertically
                left: '20px', // Shortened from left edge
                right: '20px', // Shortened from right edge
                height: '2px',
                backgroundColor: '#FF69B4',
                transform: 'translateY(-50%)',
            }}></div>

            {/* Content Block */}
            <div style={{
                position: 'absolute',
                left: '10px',
                top: '30%', // Adjusted to fit within the viewport
                transform: 'translateY(-50%)',
            }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Let's work</h1>
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>together !</h1>
            </div>

            {/* Button that moves along the horizontal line */}
            <div style={{
                position: 'absolute',
                left: `calc(${scrollPosition}% + 20px)`, // Constrain button within the line range
                top: '50%',  // Align the button to the line
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.1s ease-out', // Smooth glide
                maxWidth: 'calc(100% + 700px)', // Prevent button from going off-screen
            }}>
                <Link 
                    to="/contact" 
                    ref={buttonRef}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '200px',
                        height: '200px',
                        backgroundColor: '#FF69B4',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        borderRadius: '50%',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                >
                    <span style={{
                        position: 'absolute',
                        transition: 'transform 0.3s ease',
                        transform: isHovered 
                            ? `translate(${mousePosition.x * 0.9}px, ${mousePosition.y * 0.9}px)` 
                            : 'translate(0, 0)',
                    }}>
                        Get in touch
                    </span>
                </Link>
            </div>

            {/* Contact Buttons */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column', // Stack vertically on small screens
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column', // Stack vertically on small screens
                    alignItems: 'center',
                    width: '100%',
                    gap: '10px', // Space between buttons
                }}>
                    <AnimatedButton href={`mailto:${email}`} text={email} icon="fa-envelope" />
                    <AnimatedButton href={`tel:${phone}`} text={phone} icon="fa-phone" />
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;