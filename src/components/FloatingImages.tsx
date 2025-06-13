import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const FloatingImages: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement to rotate the image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get center position of the rotating image
      const centerX = window.innerWidth - 170; // 100px from right
      const centerY = window.innerHeight - 210; // 200px from bottom (stacked)
      
      // Calculate angle between center and cursor
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const newAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      
      setAngle(newAngle + 180);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Fixed background image in bottom right */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          width: 100*3,
          height: 100*3,
        }}
      >
        <img 
          src="site-assets/seahorse.png" // Replace with your image
          alt="Fixed decoration"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>

      {/* Rotating image that follows cursor */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 210, // Stacked above the fixed image
          right: 170,
          zIndex: 1001,
          width: 30,
          height: 30,
          transform: `rotate(${angle}deg)`,
          transition: 'transform 0.1s ease-out',
          pointerEvents: 'none', // Allows clicks to pass through
        }}
      >
        <img 
          src="site-assets/seahorse_eye.png" // Replace with your image
          alt="Rotating element"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
    </>
  );
};

export default FloatingImages;