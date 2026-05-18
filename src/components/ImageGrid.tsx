// components/ImageGrid.js
import React, { useEffect, useState } from 'react';
import { GridLegacy as Grid, Box, Backdrop, Button, Typography } from '@mui/material';
import ReactDom from 'react-dom';
import "../special-css/fadeOnHide.css"
import FadeInFadeOut from './FadeInFadeOut';
import "../special-css/backgroundBlur.css"
import { GLTFViewerRenderProvider, SingleGLTFViewer } from './GLTFViewer';
import ImageGridElement from './ImageGridElement';
import { Directory, getAssetUrl } from '@/getProntoUtils';

type Props = {
    rootDirectory: Directory
    hidden: boolean
    onClick?: (imagePath: string, index: number) => void
    showModalOnClick?: boolean
}

const ImageGrid = ({ rootDirectory, hidden, onClick: externalOnClick, showModalOnClick }: Props) => {
  const [modalImage, setModalImage] = useState<{href: string, alt: string} | undefined>(undefined)
  const [hideModal, setHideModal] = useState(true)
  const [currentDirectory, setCurrentDirectory] = useState<Directory>(rootDirectory)
  const [pathToCurrentDirectory, setPathToCurrentDirectory] = useState<Directory[]>([])

  useEffect(() => {
    // whenever hidden is changed, reset the selected project
    setCurrentDirectory(rootDirectory) 
  }, [hidden])

  useEffect(() => {
    const relativePwd = currentDirectory.pwd.substring(rootDirectory.pwd.length)
    const relativePath = relativePwd.split('/')
    const pathToCurr = [rootDirectory]
    relativePath.forEach(p => {
      if (!p) return

      const last = pathToCurr[pathToCurr.length-1]
      pathToCurr.push(last.folders[p])
    })
    setPathToCurrentDirectory(pathToCurr)
  }, [currentDirectory])

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

  return (
    <FadeInFadeOut hidden={hidden}>
      {modalImage ? modal : null}


      <Grid container spacing={2} sx={{
        // padding: "80px",
        paddingBottom: "20px",
        paddingTop: "20px"
      }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div style={{display: "flex"}}>
            {pathToCurrentDirectory.length > 1 && pathToCurrentDirectory.map((dir: Directory) => {
              return (<div key={dir.pwd}>
                <Button 
                  key={dir.pwd} 
                  onClick={() => setCurrentDirectory(dir)} 
                  disabled={dir === currentDirectory}
                  sx={{
                    fontSize:"16px", 
                    color: "#D4B387", 
                    ":hover": { color: "#ac906f" }, 
                    ":disabled": { color: "#E8DFCD" },
                    fontWeight:"bold"
                  }}
                >
                  {dir.name}
                </Button>
                { dir !== currentDirectory &&
                  <Typography sx={{fontSize:"16px", color: "#E8DFCD", fontWeight:"bold", alignContent: "center"}}>&gt;</Typography>
                }
              </div>)
            })}
          </div>
        </Grid>
        {
          Object.keys(currentDirectory.folders).map((folderName, index) => {
            const folder = currentDirectory.folders[folderName]

            return <ImageGridElement 
              key={"proj"+index} 
              index={index}
              isModalOpen={Boolean(modalImage)}
              isSpacerImage={false}
              data={folder} 
              onClick={() => {
                setCurrentDirectory(folder)
              }}
              defaultProjectName={folderName}
            />
          })
        }
        {
          currentDirectory.files.map((imagePath, index) => {
            return <ImageGridElement 
              key={"file"+index} 
              index={index}
              isModalOpen={Boolean(modalImage)}
              isSpacerImage={false}
              data={currentDirectory.pwd + imagePath} 
              onClick={() => {
                onClick(index, currentDirectory.pwd + imagePath)
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