// components/ImageGrid.js
import React, { useEffect, useState } from 'react';
import { GridLegacy as Grid, Box } from '@mui/material';
import Image from 'next/image';
import {theme} from '@/theme'
import "../special-css/fadeOnHide.css"
import FadeInFadeOut from './FadeInFadeOut';

type Props =
 {
    imagePaths: string[]
    hidden: boolean
}

const ImageGrid = ({ imagePaths: rawImagePaths, hidden }: Props) => {
  const [imagePaths, setImagePaths] = useState(rawImagePaths)

  useEffect(() => {
    const nautilusSpacing = 6

    const tempImagePaths = [... rawImagePaths]
    let loopLength = Math.floor(rawImagePaths.length / nautilusSpacing)
    for (let i = loopLength; i >= 0; i--) {
      tempImagePaths.splice(i*nautilusSpacing, 0, i%2 == 0 ? "site-assets/nautilus_left.svg" : "site-assets/nautilus_right.svg")
    }
    setImagePaths(tempImagePaths)

    console.log(tempImagePaths)
    console.log(loopLength + "+1 nautiluses to insert")
  }, [rawImagePaths])

  return (
    <FadeInFadeOut hidden={hidden}>

      <Grid container spacing={2} sx={{
        padding: "80px",
      }}>
        {imagePaths.map((imgSrc, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '100%', // Creates a square container
                overflow: 'hidden',
                '&:hover img': {
                  transform: 'scale(1.05)',
                },
                border: "3px solid " + theme.palette.background.defaultDark,
                borderRadius: "10px",
                background: theme.palette.background.paperLight
              }}
            >
              <Image
                src={imgSrc}
                alt={`Image ${index + 1}`}
                fill
                style={{
                  objectFit: 'contain', // Maintains aspect ratio
                  transition: 'transform 0.3s ease-in-out',
                  padding: "10px"
                }}
                // Calculate the intrinsic aspect ratio
                // sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
              />
            </Box>
          </Grid>
        ))}
      </Grid>


    </FadeInFadeOut>
  );
};

export default ImageGrid;