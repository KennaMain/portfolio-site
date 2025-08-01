// components/ImageGrid.js
import React, { ReactNode, useEffect, useState } from 'react';
import { GridLegacy as Grid, Box, Backdrop } from '@mui/material';
import Image from 'next/image';
import ReactDom from 'react-dom';
import "../special-css/fadeOnHide.css"
import FadeInFadeOut from './FadeInFadeOut';
import "../special-css/backgroundBlur.css"
import { GLTFViewerRenderProvider, SingleGLTFViewer } from './GLTFViewer';

type Props = {
    imagePaths: string[]
    hidden: boolean
    spacerImagePaths?: string[]
    onClick?: (imagePath: string, index: number) => void
    showModalOnClick?: boolean
}

const ImageGrid = ({ imagePaths: rawImagePaths, hidden, spacerImagePaths, onClick: externalOnClick, showModalOnClick }: Props) => {
  const [imagePaths, setImagePaths] = useState(rawImagePaths)
  const [isSpacerImage, setIsSpacerImage] = useState([false])
  const [originalIndexMap, setOriginalIndexMap] = useState([-1]) // maps index_of_element_from(imagePaths) to index_of_same_element_in(rawImagePaths)
  const [modalImage, setModalImage] = useState<{href: string, alt: string} | undefined>(undefined)
  const [hideModal, setHideModal] = useState(true)

  // =============================================
  // Spacer Images
  // ---------------------------------------------

  useEffect(() => {
    if (!spacerImagePaths) return

    const realImageRunLength = 6
    const tempImagePaths = [spacerImagePaths[1]]
    const tempOriginalIndexMap = [-1]
    const tempIsSpacerImage = [true]
    let j = 0
    for (let i = 1; j < rawImagePaths.length; i++) {
      if (i % (realImageRunLength+1) === 0) {
        tempImagePaths.push(spacerImagePaths[0])
        tempImagePaths.push(spacerImagePaths[1])
        tempIsSpacerImage.push(true)
        tempIsSpacerImage.push(true)
        tempOriginalIndexMap.push(-1)
        tempOriginalIndexMap.push(-1)
      } else {
        tempImagePaths.push(rawImagePaths[j])
        tempOriginalIndexMap.push(j)
        j++
        tempIsSpacerImage.push(false)
      }
    }
    setImagePaths(tempImagePaths)
    setIsSpacerImage(tempIsSpacerImage)
    setOriginalIndexMap(tempOriginalIndexMap)
  }, [rawImagePaths, spacerImagePaths])

  // ---------------------------------------------
  // Spacer Images
  // =============================================

  // =============================================
  // Helper Functions and Styling
  // ---------------------------------------------

  const onClick = (index: number, imgSrc: string) => { 
    if (isSpacerImage[index]) return
    if (externalOnClick) externalOnClick(imgSrc, originalIndexMap[index])
    
    if (showModalOnClick ?? true) {
      setModalImage({href: imgSrc, alt: "Portfolio image " + (index+1)})
      setHideModal(false)
    }
  }

  const gridItemBackgroundStyling = (index: number) => {
    const sx = {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: '100%', // Creates a square container
      overflow: 'hidden',
    }

    if (!isSpacerImage[index])
    {
      return {
        ...sx,
        '&:hover img': {
          transform: 'scale(1.05)',
        },
        // border: "3px solid " + theme.palette.background.defaultDark,
        // borderRadius: "10px",
        // background: theme.palette.background.paperLight
      }
    }

    return sx
  }

  const resoureceIsModel = (href?: string) => {
    if (!href) return null

    return href.endsWith(".glb") || href.endsWith(".gltf") 
  }

  // ---------------------------------------------
  // Helper Functions and Styling
  // =============================================

  // =============================================
  // 3D Model Rendering
  // ---------------------------------------------

  const gridModelViewer = (modelSrc: string): ReactNode => {
    return (
      <Box>
        {modalImage ? null : 
          <SingleGLTFViewer 
            url={modelSrc} 
            style={{
              objectFit: 'contain',
              transition: 'transform 0.3s ease-in-out',
              padding: "10px",
              width: "100%",
              aspectRatio: "1 / 1"
            }}
            controlsEnabled={false}
            backgroundColor="lightblue"
          />
        }
      </Box>
    )
  }

  const modalModelViewer = (modelSrc?: string) => {
    if (!modelSrc) return null

    return (
      <SingleGLTFViewer 
        url={modelSrc} 
        style={{
          objectFit: 'contain',
          transition: 'transform 0.3s ease-in-out',
          padding: "10px",
          width: "100%",
          aspectRatio: "1 / 1",
          zIndex: 90000
        }}
        controlsEnabled={true}
      />
    )
  }

  // ---------------------------------------------
  // 3D Model Rendering
  // =============================================

  // =============================================
  // Image Rendering
  // ---------------------------------------------

  const gridImageViewer = (imgSrc: string, index: number): ReactNode => {
    return (
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
    )
  }

  const modalImageViewer = (imgSrc?: string, alt?: string) => {
    if (!imgSrc) return null

    return (
      <img 
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
        }} 
        src={imgSrc} 
        alt={alt}
      />
    )
  }

  // ---------------------------------------------
  // Image Rendering
  // =============================================

  const modal = typeof document === 'undefined' ? null : ReactDom.createPortal(
    <Box 
      onClick={() => { setHideModal(true) }}
      style={{
        zIndex: 999999, 
        position: "fixed", 
        left: 0, 
        top: 0, 
        bottom: 0, 
        right: 0,  
      }}
    >
      <GLTFViewerRenderProvider style={modalImage? {zIndex: 999999} : {}}/>
      <FadeInFadeOut fadeTime='0.3s' hidden={hideModal} onFadeOutAnimationEnd={() => setModalImage(undefined)}>
        <Backdrop
          sx={{ color: '#fff', zIndex: 5000, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          open={Boolean(modalImage)}
          className="backgroundBlur"
        >
          <Box
            className="FadeModal"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            { resoureceIsModel(modalImage?.href)
              ? modalModelViewer(modalImage?.href) 
              : modalImageViewer(modalImage?.href, modalImage?.alt)
            }
          </Box>
        </Backdrop>
      </FadeInFadeOut>
    </Box>,
    document.body
  )

  return (
    <FadeInFadeOut hidden={hidden}>
      {modalImage ? modal : null}

      <Grid container spacing={2} sx={{
        padding: "80px",
      }}>
        {imagePaths.map((imgSrc: string, index: number) => (
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} key={index}>
            <Box sx={gridItemBackgroundStyling(index)} onClick={() => onClick(index, imgSrc)}>
              {
                resoureceIsModel(imgSrc)
                ? gridModelViewer(imgSrc) 
                : gridImageViewer(imgSrc, index)
              }
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* This is the render provider for the grid. If this component still exists while the modal is active, it will render the grid items (the ones that are 3d models I mean) on top of the modal */}
      {modalImage ? null : <GLTFViewerRenderProvider/>}
    </FadeInFadeOut>
  );
};

export default ImageGrid;