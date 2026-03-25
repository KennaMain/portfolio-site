import { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

// Custom hook to calculate optimal font size
const useDynamicFontSize = (text: string, minFontSize: number, maxFontSize: number) => {
  const elementRef = useRef(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const calculateFontSize = () => {
      if (!elementRef.current) return;

      const element = elementRef.current as any;
      const container = element.parentElement;
      
      if (!container) return;

      // Temporarily set a large font size to measure
      element.style.fontSize = `${maxFontSize}px`;
      element.style.whiteSpace = 'nowrap';
      
      let currentSize = maxFontSize;
      let textWidth = element.scrollWidth;
      const containerWidth = container.clientWidth;

      // Binary search for optimal font size
      let low = minFontSize;
      let high = maxFontSize;
      
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        element.style.fontSize = `${mid}px`;
        textWidth = element.scrollWidth;
        
        if (textWidth <= containerWidth) {
          currentSize = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      
      setFontSize(currentSize);
      
      // Reset white-space
      element.style.whiteSpace = '';
    };

    calculateFontSize();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateFontSize);
    
    return () => {
      window.removeEventListener('resize', calculateFontSize);
    };
  }, [text, minFontSize, maxFontSize]);

  return { ref: elementRef, fontSize };
};

// Dynamic Typography component
export const DynamicTypography = ({ children, minFontSize, maxFontSize, ...props }: any) => {
  const { ref, fontSize } = useDynamicFontSize(children, minFontSize ?? 2, maxFontSize ?? 200);
  
  return (
    <Typography
      ref={ref}
      sx={{
        fontSize: `${fontSize}px`,
        whiteSpace: 'nowrap',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

// // Your main component
// const YourComponent = ({ projectTitle }) => {
//   return (
//     <Box sx={{
//       display: "flex", 
//       flexDirection: "column",
//       padding: "10px",
//       textAlign: "center", 
//       color: "#FEFBE0", 
//       width: "100%", 
//       opacity: "90%",
//       backgroundColor: "#2d2d2e"
//     }}>
//       {
//         projectTitle.split('\n').map((titlePhrase, index) => 
//           <DynamicTypography key={index + titlePhrase}>
//             {titlePhrase}
//           </DynamicTypography>
//         )
//       }
//     </Box>
//   );
// };