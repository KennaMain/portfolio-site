'use client'

import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useMouseAngleTracking } from '../hooks/UseMouseAngleTracking';

type Props = {
  bottom?: string|number|undefined
  right?: string|number|undefined
  top?: string|number|undefined
  left?: string|number|undefined
  zIndex?: number|undefined
  width?: string|number|undefined
  height?: string|number|undefined
  src: string
  alt: string
}

const MouseTrackingEye = ({bottom, right, top, left, zIndex, width, height, src, alt}: Props) => {
  const eyeElementRef = useRef<HTMLImageElement>(null) || undefined
  const { angle } = useMouseAngleTracking({ref: eyeElementRef})

  return (
    <Box
      sx={{
        position: "absolute",
        bottom,
        right,
        top,
        left,
        zIndex,
        width,
        height,
        transform: `rotate(${angle}deg)`,
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none',
      }}
    >
      <img 
        ref={eyeElementRef}
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  );
};

export default MouseTrackingEye;