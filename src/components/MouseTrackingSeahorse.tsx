'use client'

import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useMouseAngleTracking } from '../hooks/UseMouseAngleTracking';
import MouseTrackingEye from './MouseTrackingEye';

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

      <MouseTrackingEye 
        src="site-assets/seahorse_eye.svg"
        alt="Seahorse Eye"
        bottom={219}
        right={185}
        position="fixed"
        zIndex={1001}
        width={21}
        height={21}
      />
    </>
  );
};

export default MouseTrackingSeahorse;