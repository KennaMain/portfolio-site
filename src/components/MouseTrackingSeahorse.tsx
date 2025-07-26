'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const MouseTrackingSeahorse: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const prevAngleRef = useRef(0);

  // Handle mouse movement to rotate the image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get center position of the rotating image
      const centerX = window.innerWidth - 170; // 100px from right
      const centerY = window.innerHeight - 210; // 200px from bottom (stacked)
      
      // Calculate angle between center and cursor
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      let newAngle = Math.atan2(dy, dx) * 180 / Math.PI + 180;
      
      // Smooth angle transitions when crossing the 360° boundary
      const prevAngle = prevAngleRef.current;
      const diff = newAngle - prevAngle;
      
      // If the difference is more than 180°, we've crossed the boundary
      if (diff > 180) newAngle -= 360;
      if (diff < -180) newAngle += 360;
      
      prevAngleRef.current = newAngle;
      setAngle(newAngle);
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
          bottom: -2,
          right: 20,
          zIndex: 1000,
          width: 320,
          height: 320,
        }}
      >
        <img 
          src="site-assets/seahorse.svg"
          alt="Seahorse Friend :)"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>

      {/* Rotating image that follows cursor */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 219,
          right: 185,
          zIndex: 1001,
          width: 21,
          height: 21,
          transform: `rotate(${angle}deg)`,
          transition: 'transform 0.1s ease-out',
          pointerEvents: 'none',
        }}
      >
        <img 
          src="site-assets/seahorse_eye.svg"
          alt="Seahorse Eye"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
    </>
  );
};

export default MouseTrackingSeahorse;