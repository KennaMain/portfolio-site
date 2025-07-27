'use client'

import { useState, useEffect, useRef } from 'react';

type Props = {
  ref: React.RefObject<HTMLElement | null>
}

export const useMouseAngleTracking = ({ref}: Props) => { 
  const [angle, setAngle] = useState(0);
  const prevAngleRef = useRef(0);

  // Handle mouse movement to rotate the image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width/2
      const centerY = rect.top + rect.height/2

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

  return { angle }
}