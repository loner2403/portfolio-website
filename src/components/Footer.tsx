import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: '20px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
    
        }}>
            {/* Social Media Links */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '10px',
            }}>
                <a 
                    href="https://www.linkedin.com/in/akash-tripathi-771813119/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '1.5rem',
                        transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF69B4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                >
                    <i className="fab fa-linkedin"></i>
                </a>
                
                <a 
                    href="https://x.com/tzar_06?t=7LUarMy9D23plkSglW_VoQ&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '1.5rem',
                        transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF69B4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                >
                    <i className="fab fa-twitter"></i>
                </a>

                
                <a 
                    href="https://www.instagram.com/tzar_06?igsh=MTR4eHFwYTl2eDhpZw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '1.5rem',
                        transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF69B4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                >
                    <i className="fab fa-instagram"></i>
                </a>
                
                <a 
                    href="https://www.youtube.com/channel/UCiaNFKjyUt59BmND70NRP-g?app=desktop&reload=9&sub_confirmation=1 " 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '1.5rem',
                        transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF69B4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                >
                    <i className="fab fa-youtube"></i>
                </a>
            </div>

            {/* Copyright Info */}
            <div style={{
                textAlign: 'center',
                fontSize: '1rem',
            }}>
                <p>&copy; 2024 Edition. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
