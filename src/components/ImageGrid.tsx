// components/ImageGrid.js
import React, { useEffect, useState } from 'react';
import { GridLegacy as Grid, Box, Backdrop, Button } from '@mui/material';
import ReactDom from 'react-dom';
import "../special-css/fadeOnHide.css"
import FadeInFadeOut from './FadeInFadeOut';
import "../special-css/backgroundBlur.css"
import { GLTFViewerRenderProvider, SingleGLTFViewer } from './GLTFViewer';
import ImageGridElement from './ImageGridElement';
import { Directory, getAssetUrl } from '@/awsUtils';

type Props = {
    directory: Directory
    hidden: boolean
    spacerImagePaths?: string[]
    onClick?: (imagePath: string, index: number) => void
    onClickBackButton?: () => void
    showModalOnClick?: boolean
}

const ImageGrid = ({ directory, hidden, spacerImagePaths, onClick: externalOnClick, onClickBackButton, showModalOnClick }: Props) => {
  // const [isSpacerImage, setIsSpacerImage] = useState([false])
  // const [originalIndexMap, setOriginalIndexMap] = useState([-1]) // maps index_of_element_from(imagePaths) to index_of_same_element_in(rawImagePaths)
  const [modalImage, setModalImage] = useState<{href: string, alt: string} | undefined>(undefined)
  const [hideModal, setHideModal] = useState(true)
  const [projectIndex, setProjectIndex] = useState<string | undefined>(undefined)

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

  // const gridItemBackgroundStyling = (index: number, isSpacerImage: boolean = false) => {
  //   const sx = {
  //     position: 'relative',
  //     width: '100%',
  //     height: 0,
  //     paddingBottom: '100%', // Creates a square container
  //     transition: 'transform 0.3s ease-in-out',
  //     // overflow: 'hidden',
  //   }

  //   if (!isSpacerImage)
  //   {
  //     return {
  //       ...sx,
  //       '&:hover img': {
  //         transform: 'scale(1.05)',
  //       },
  //       // border: "3px solid " + theme.palette.background.defaultDark,
  //       // borderRadius: "10px",
  //       // background: theme.palette.background.paperLight
  //     }
  //   }

  //   return sx
  // }

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

    if (imgSrc.endsWith(".pdf")) {
      return (
        <embed 
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "100%",
            objectFit: "contain",
          }} 
          src={getAssetUrl(imgSrc)} 
          type="application/pdf"
        />
      )
    }

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
      style={{
        zIndex: 999999, 
        position: "fixed", 
        left: 0, 
        top: 0, 
        bottom: 0, 
        right: 0,  
      }}
    >
      <Button onClick={() => setHideModal(true)} sx={{zIndex: 999999, position:"fixed", top: "30px", left:"30px", borderRadius: "10000px", background: "white", fontStyle: "bold", aspectRatio: "1:1"}}>X</Button>
      <GLTFViewerRenderProvider style={modalImage? {zIndex: 999998} : {}}/>
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
      onClickBackButton={() => setProjectIndex(undefined)}
    />
  }

  return (
    <FadeInFadeOut hidden={hidden}>
      {modalImage ? modal : null}


      <Grid container spacing={2} sx={{
        padding: "80px",
      }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {onClickBackButton ? <Button onClick={onClickBackButton} sx={{fontSize:"16px"}}>Back</Button> : null}
        </Grid>
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
              defaultProjectName={folderName}
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