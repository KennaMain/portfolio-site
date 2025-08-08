// components/ImageGrid.js
import React, { ReactNode, useEffect, useState } from 'react';
import { GridLegacy as Grid, Box, Typography } from '@mui/material';
import Image from 'next/image';
import "../special-css/fadeOnHide.css"
import "../special-css/backgroundBlur.css"
import { SingleGLTFViewer } from './GLTFViewer';
import { Directory, DirectoryMetadata, fetchJsonFromAWS } from '@/app/portfolio/tab1FilesList';

const S3_BASE_URL = "https://kennamainportfolio.s3.us-east-2.amazonaws.com"

const getAssetUrl = (assetName: string) => {
  // if (!assetName.startsWith("/")) throw new Error(`Asset name (${assetName}) must start with /`)
  if (!assetName.startsWith("/")) assetName = "/" + assetName
  if (assetName.startsWith("/site-assets")) return assetName

  return `${S3_BASE_URL}${assetName}`
}

type Props = {
    isSpacerImage?: boolean
    data: Directory | string
    index: number
    onClick?: () => void
    isModalOpen?: boolean
}

const ImageGridElement = ({ isSpacerImage, data, index, onClick, isModalOpen }: Props) => {
  const [thumbnail, setThumbnail] = useState("Loading")
  const [projectTitle, setProjectTitle] = useState("Project")
  const elementType = typeof data === "string" ? "single file" : "project"

  useEffect(() => {
    if (typeof data === "string") {
      setThumbnail(data)
      return
    }

    const directory = data as Directory

    // try fetch metadata
    const metadata = directory.files.includes("metadata.json") ? fetchJsonFromAWS<DirectoryMetadata>(directory.pwd + "metadata.json") as any : undefined
    if (metadata?.title) {
      setProjectTitle(metadata.title)
    }

    if (metadata?.thumbnail) {
      setThumbnail(directory.pwd + metadata.thumbnail)
    } else {
      setThumbnail(directory.pwd + directory.files[0])
    }

  }, [data])

  const gridItemBackgroundStyling = () => {
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

  const gridModelViewer = (modelSrc: string): ReactNode => {
    return (
      <Box>
        {isModalOpen ? null : 
          <SingleGLTFViewer 
            url={getAssetUrl(modelSrc)}
            style={{
              objectFit: 'contain',
              // transition: 'transform 0.3s ease-in-out',
              padding: "10px",
              width: "100%",
              aspectRatio: "1 / 1"
            }}
            controlsEnabled={false}
            backgroundColor="lightblue"
          />
        }
        <img id="3dmodelframe" src="site-assets/3d_model_frame.png" style={{position: "absolute", width: "100%", top: "-40px", imageRendering: "pixelated"}}/>
      </Box>
    )
  }

  const gridImageViewer = (imgSrc: string, index: number, shouldBlur: boolean): ReactNode => {
    return (
      <Image
        src={getAssetUrl(imgSrc)}
        alt={`Image ${index + 1}: ${imgSrc}`}
        fill
        // className={shouldBlur ? "backgroundBlur" : undefined}
        style={{
          objectFit: 'contain', // Maintains aspect ratio
          transition: 'transform 0.3s ease-in-out',
          padding: "10px",
          opacity: shouldBlur ? '50%' : undefined,
        }}
      />
    )
  }

  if (thumbnail === "Loading") {
    return <Typography>Loading ...</Typography>
  }

  return (
    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} key={index}>
      <Box sx={gridItemBackgroundStyling()} onClick={onClick}>
        {
          resoureceIsModel(thumbnail)
          ? gridModelViewer(thumbnail) 
          : gridImageViewer(thumbnail, index, isSpacerImage ?? false)
        }
        {
          elementType === "project" 
          ? <Box sx={{
              height: "100%",
              width: "100%",
              lineHeight: "100%",
              display: "flex",
              justifyContent: "center", /* Centers content horizontally */
              alignItems: "center"    /* Centers content vertically */
            }}>
              <Typography sx={{paddingTop: "50%", opacity: "100%", color: "white", fontSize: "28px"}}>
                {projectTitle}
              </Typography>
            </Box> 
          : null 
        }
      </Box>
    </Grid>
  );
};

export default ImageGridElement;