// components/ImageGrid.js
import React, { useEffect, useState } from 'react';
import { GridLegacy as Grid, Box } from '@mui/material';
import Image from 'next/image';
import {theme} from '@/theme'
import "../special-css/fadeOnHide.css"
import FadeInFadeOut from './FadeInFadeOut';

type Props = {
    imagePaths: string[]
    hidden: boolean
    spacerImagePaths: string[]
}

const ImageGrid = ({ imagePaths: rawImagePaths, hidden, spacerImagePaths }: Props) => {
  const [imagePaths, setImagePaths] = useState(rawImagePaths)
  const [isSpacerImage, setIsSpacerImage] = useState([false])

  // insert spacer images
  useEffect(() => {
    const realImageRunLength = 6
    const tempImagePaths = [spacerImagePaths[0]]
    const tempIsSpacerImage = [true]
    let j = 0
    for (let i = 1; j < rawImagePaths.length; i++) {
      if (i % (realImageRunLength+1) === 0) {
        tempImagePaths.push(spacerImagePaths[0])
        tempImagePaths.push(spacerImagePaths[1])
        tempIsSpacerImage.push(true)
        tempIsSpacerImage.push(true)
      } else {
        tempImagePaths.push(rawImagePaths[j])
        j++
        tempIsSpacerImage.push(false)
      }
    }
    setImagePaths(tempImagePaths)
    setIsSpacerImage(tempIsSpacerImage)
  }, [rawImagePaths])


  const gridItemBackgroundStyling = (index: number) => {
    const sx = {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingTop: '100%', // Creates a square container
      overflow: 'hidden',
    }

    if (!isSpacerImage[index])
    {
      return {
        ...sx,
        '&:hover img': {
          transform: 'scale(1.05)',
        },
        border: "3px solid " + theme.palette.background.defaultDark,
        borderRadius: "10px",
        background: theme.palette.background.paperLight
      }
    }

    return sx
  }

  return (
    <FadeInFadeOut hidden={hidden}>

      <Grid container spacing={2} sx={{
        padding: "80px",
      }}>
        {imagePaths.map((imgSrc, index) => (
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} key={index}>
            <Box sx={gridItemBackgroundStyling(index)}>
              <Image
                src={imgSrc}
                alt={`Image ${index + 1}`}
                fill
                style={{
                  objectFit: 'contain', // Maintains aspect ratio
                  transition: 'transform 0.3s ease-in-out',
                  padding: "10px"
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>


    </FadeInFadeOut>
  );
};

export default ImageGrid;