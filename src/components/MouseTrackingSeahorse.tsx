'use client'

import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useMouseAngleTracking } from '../hooks/UseMouseAngleTracking';

const MouseTrackingSeahorse: React.FC = () => {
  const eyeElementRef = useRef<HTMLImageElement>(null) || undefined
  const { angle } = useMouseAngleTracking({ref: eyeElementRef})

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
          pointerEvents: "none"
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
          ref={eyeElementRef}
          src="site-assets/seahorse_eye.svg"
          alt="Seahorse Eye"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
    </>
  );
};

export default MouseTrackingSeahorse;