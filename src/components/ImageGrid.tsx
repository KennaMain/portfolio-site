// components/ImageGrid.js
import React, { useEffect, useState } from 'react';
import { GridLegacy as Grid, Box, Backdrop } from '@mui/material';
import Image from 'next/image';
import {theme} from '@/theme'
import ReactDom from 'react-dom';
import "../special-css/fadeOnHide.css"
import FadeInFadeOut from './FadeInFadeOut';
import "../special-css/backgroundBlur.css"

type Props = {
    imagePaths: string[]
    hidden: boolean
    spacerImagePaths: string[]
}

const ImageGrid = ({ imagePaths: rawImagePaths, hidden, spacerImagePaths }: Props) => {
  const [imagePaths, setImagePaths] = useState(rawImagePaths)
  const [isSpacerImage, setIsSpacerImage] = useState([false])
  const [modalImage, setModalImage] = useState<{href: string, alt: string} | undefined>(undefined)
  const [hideModal, setHideModal] = useState(true)

  // insert spacer images
  useEffect(() => {
    const realImageRunLength = 6
    const tempImagePaths = [spacerImagePaths[1]]
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
  }, [rawImagePaths, spacerImagePaths])

  const onClick = (index: number, imgSrc: string) => { 
    if (isSpacerImage[index]) return
    
    setModalImage({href: imgSrc, alt: "Portfolio image " + index})
    setHideModal(false)
  }

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
      {modalImage && (
        ReactDom.createPortal(
          <Box 
            onClick={() => { setHideModal(true) }}
            className="backgroundBlur"
            style={{
              zIndex: 999999, 
              position:"fixed", 
              left:0, 
              top:0, 
              bottom:0, 
              right:0,  
            }
          }>
            <FadeInFadeOut hidden={hideModal} onFadeOutAnimationEnd={() => setModalImage(undefined)}>
              <Backdrop
                sx={{ color: '#fff', zIndex: 5000, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                open={Boolean(modalImage)}
              >
                <Box
                  className="FadeModal"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    // bgcolor: "background.paper",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: 24,
                    padding: "20px"
                  }}
                >
                  <Image style={{width: "100%"}} width={90000} height={90000} src={modalImage.href} alt={modalImage.alt}/>
                </Box>
              </Backdrop>
            </FadeInFadeOut>
          </Box>,
          document.body
        )
      )}

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
                onClick={() => onClick(index, imgSrc)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>


    </FadeInFadeOut>
  );
};

export default ImageGrid;