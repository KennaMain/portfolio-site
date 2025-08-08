// components/ImageGrid.js
import React, { ReactNode, useEffect, useState } from 'react';
import { GridLegacy as Grid, Box, Backdrop, Typography } from '@mui/material';
import Image from 'next/image';
import ReactDom from 'react-dom';
import "../special-css/fadeOnHide.css"
import FadeInFadeOut from './FadeInFadeOut';
import "../special-css/backgroundBlur.css"
import { GLTFViewerRenderProvider, SingleGLTFViewer } from './GLTFViewer';
import ImageGridElement from './ImageGridElement';
import { Directory } from '@/app/portfolio/tab1FilesList';

const S3_BASE_URL = "https://kennamainportfolio.s3.us-east-2.amazonaws.com"

const getAssetUrl = (assetName: string) => {
  // if (!assetName.startsWith("/")) throw new Error(`Asset name (${assetName}) must start with /`)
  if (!assetName.startsWith("/")) assetName = "/" + assetName
  if (assetName.startsWith("/site-assets")) return assetName

  if (assetName.startsWith('/portfolio')) assetName = assetName.slice(10)
  return `${S3_BASE_URL}${assetName}`
}

type Props = {
    directory: Directory
    hidden: boolean
    spacerImagePaths?: string[]
    onClick?: (imagePath: string, index: number) => void
    showModalOnClick?: boolean
}

const ImageGrid = ({ directory, hidden, spacerImagePaths, onClick: externalOnClick, showModalOnClick }: Props) => {
  // const [isSpacerImage, setIsSpacerImage] = useState([false])
  // const [originalIndexMap, setOriginalIndexMap] = useState([-1]) // maps index_of_element_from(imagePaths) to index_of_same_element_in(rawImagePaths)
  const [modalImage, setModalImage] = useState<{href: string, alt: string} | undefined>(undefined)
  const [hideModal, setHideModal] = useState(true)
  const [projectIndex, setProjectIndex] = useState<string | undefined>(undefined)

  console.log(directory)

  useEffect(() => {
    // whenever hidden is changed, reset the selected project
    setProjectIndex(undefined) 
  }, [hidden])

  // =============================================
  // Spacer Images
  // ---------------------------------------------

  // useEffect(() => {
  //   if (!spacerImagePaths) return

  //   const realImageRunLength = 6
  //   const tempImagePaths = [spacerImagePaths[1]]
  //   const tempOriginalIndexMap = [-1]
  //   const tempIsSpacerImage = [true]
  //   let j = 0
  //   for (let i = 1; j < imagePaths.length; i++) {
  //     if (i % (realImageRunLength+1) === 0) {
  //       tempImagePaths.push(spacerImagePaths[0])
  //       tempImagePaths.push(spacerImagePaths[1])
  //       tempIsSpacerImage.push(true)
  //       tempIsSpacerImage.push(true)
  //       tempOriginalIndexMap.push(-1)
  //       tempOriginalIndexMap.push(-1)
  //     } else {
  //       tempOriginalIndexMap.push(j)
  //       j++
  //       tempIsSpacerImage.push(false)
  //     }
  //   }
  //   setIsSpacerImage(tempIsSpacerImage)
  //   setOriginalIndexMap(tempOriginalIndexMap)
  // }, [imagePaths, spacerImagePaths])

  // ---------------------------------------------
  // Spacer Images
  // =============================================

  // =============================================
  // Helper Functions and Styling
  // ---------------------------------------------

  const onClick = (index: number, imgSrc: string) => { 
    // if (isSpacerImage[index]) return
    if (externalOnClick) externalOnClick(imgSrc, index)
    
    if (showModalOnClick ?? true) {
      setModalImage({href: imgSrc, alt: "Portfolio image " + (index+1)})
      setHideModal(false)
    }
  }

  const gridItemBackgroundStyling = (index: number, isSpacerImage: boolean = false) => {
    const sx = {
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: '100%', // Creates a square container
      transition: 'transform 0.3s ease-in-out',
      // overflow: 'hidden',
    }

    if (!isSpacerImage)
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

  const modalModelViewer = (modelSrc?: string) => {
    if (!modelSrc) return null

    return (
      <SingleGLTFViewer 
        url={getAssetUrl(modelSrc)} 
        style={{
          objectFit: 'contain',
          // transition: 'transform 0.3s ease-in-out',
          padding: "10px",
          width: "100%",
          aspectRatio: "1 / 1",
          zIndex: 90000
        }}
        controlsEnabled={true}
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
        src={getAssetUrl(imgSrc)} 
        alt={alt}
      />
    )
  }

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

  if (projectIndex) {
    // todo: should I render all projects' image grids and just hide them unless their project index is selected?
    return <ImageGrid 
      directory={directory.folders[projectIndex]} 
      hidden={hidden} 
      spacerImagePaths={spacerImagePaths} 
      onClick={externalOnClick} 
      showModalOnClick={showModalOnClick}
    />
  }

  console.log(directory.files.map((imagePath, index) => directory.pwd + imagePath))

  return (
    <FadeInFadeOut hidden={hidden}>
      {modalImage ? modal : null}

      <Grid container spacing={2} sx={{
        padding: "80px",
      }}>
        {
          Object.keys(directory.folders).map((folderName, index) => {
            const folder = directory.folders[folderName]

            return <ImageGridElement 
              key={"proj"+index} 
              index={index}
              isModalOpen={Boolean(modalImage)}
              isSpacerImage={false}
              data={folder} 
              onClick={() => {
                setProjectIndex(folderName)
              }}
            />
          })
        }
        {
          directory.files.map((imagePath, index) => {
            return <ImageGridElement 
              key={"file"+index} 
              index={index}
              isModalOpen={Boolean(modalImage)}
              isSpacerImage={false}
              data={directory.pwd + imagePath} 
              onClick={() => {
                onClick(index, directory.pwd + imagePath)
              }}
            />
          })
        }
      </Grid>

      {/* This is the render provider for the grid. If this component still exists while the modal is active, it will render the grid items (the ones that are 3d models I mean) on top of the modal */}
      {modalImage ? null : <GLTFViewerRenderProvider/>}
    </FadeInFadeOut>
  );
};

export default ImageGrid;