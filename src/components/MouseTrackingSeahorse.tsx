'use client'

import React from 'react';
import { Box } from '@mui/material';
import MouseTrackingEye from './MouseTrackingEye';

const MouseTrackingSeahorse: React.FC = () => {
  return (
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

      <MouseTrackingEye 
        src="site-assets/seahorse_eye.svg"
        alt="Seahorse Eye"
        bottom={219}
        right={165}
        zIndex={1001}
        width={21}
        height={21}
      />
    </Box>
  );
};

export default MouseTrackingSeahorse;