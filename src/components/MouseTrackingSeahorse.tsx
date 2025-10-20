'use client'

import React from 'react';
import { Box } from '@mui/material';
import MouseTrackingEye from './MouseTrackingEye';

type Props = {
  hide: boolean
  doNotHideOnSmall?: boolean
}

const MouseTrackingSeahorse = ({ hide, doNotHideOnSmall }: Props) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: -2,
        right: 20,
        zIndex: 1000,
        width: 320,
        height: 320,
        pointerEvents: "none",
        transition: "transform 1s ease-in-out",
        transform: hide ? "translateX(500px)" : "translateX(0)",
        display: {xs: doNotHideOnSmall ? 'block' : 'none', md: 'block'}
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