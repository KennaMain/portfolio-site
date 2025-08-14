'use client'

// components/ImageGrid.js
import React, { ReactNode, useEffect, useState } from 'react';
import { GridLegacy as Grid, Box, Typography } from '@mui/material';
import Image from 'next/image';
import "../special-css/fadeOnHide.css"
import "../special-css/backgroundBlur.css"
import { SingleGLTFViewer } from './GLTFViewer';
import { Directory, DirectoryMetadata, fetchJsonFromAWS } from '@/awsUtils';
import { GridPDFViewer } from './ImageGrid/GridPDFViewer';

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
    defaultProjectName?: string
}

enum ResourceType {
  NONE = "none",
  IMAGE = "image",
  GLB_MODEL = "glb/gltf model",
  PDF = "pdf",
  JSON = "json"
}

const ImageGridElement = ({ isSpacerImage, data, index, onClick, isModalOpen, defaultProjectName }: Props) => {
  const [thumbnail, setThumbnail] = useState("Loading")
  const [resourceType, setResourceType] = useState(ResourceType.NONE)
  const [projectTitle, setProjectTitle] = useState(defaultProjectName ?? "Project")
  const elementType = typeof data === "string" ? "single file" : "project"
  const shouldSkip = typeof data === "string" && data.endsWith(".json")

  const setResourceUrl = (url: string) => {
    setThumbnail(url)
    setResourceType(parseResourceType(url))
  }

  useEffect(() => {
    if (shouldSkip) {
      return
    }

    if (typeof data === "string") {
      setResourceUrl(data)
      return
    }

    const directory = data as Directory

    (async () => {
      // try fetch metadata
      const metadata = directory.files.includes("metadata.json") ? await fetchJsonFromAWS<DirectoryMetadata>(directory.pwd + "metadata.json") : undefined
      if (metadata?.title) {
        setProjectTitle(metadata.title)
      }

      if (metadata?.thumbnail) {
        setResourceUrl(directory.pwd + metadata.thumbnail.replaceAll(" ", "+"))
      } else {
        setResourceUrl(directory.pwd + directory.files[0])
      }
    })()
  }, [(data as Directory)?.pwd])

  const parseResourceType = (href?: string): ResourceType => {
    if (!href) return ResourceType.NONE

    if (href.endsWith(".glb") || href.endsWith(".gltf")) {
      return ResourceType.GLB_MODEL
    } else if (href.endsWith(".pdf")) {
      return ResourceType.PDF
    } else if (href.endsWith(".png") || href.endsWith(".jpg") || href.endsWith(".jpeg")) {
      return ResourceType.IMAGE
    } else if (href.endsWith(".json")) {
      return ResourceType.JSON
    }

    // fallback to image viewing
    return ResourceType.IMAGE
  }

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
        className={shouldBlur ? "backgroundBlur" : undefined}
        style={{
          objectFit: shouldBlur ? "cover" : "contain",
          transition: 'transform 0.3s ease-in-out',
          padding: "10px",
          background: "transparent",
          filter: shouldBlur ? "sepia(1) hue-rotate(190deg) brightness(70%) saturate(0.9) contrast(50%)" : undefined
        }}
      />
    )
  }

  const gridPDFViewer = (pdfSrc: string) => {
    console.log("PDF viewer is broken, go view it yourself: " + pdfSrc)
    // return (
    //   <object data={pdfSrc} type="application/pdf" width="100%" height="100%">
    //     <p>Alternative text - include a link <a href={pdfSrc}>to the PDF!</a></p>
    //   </object>
    // )
    // return gridImageViewer(pdfSrc, -27, false)
    // return <GridPDFViewer src={pdfSrc}/>
    return null
  }

  if (shouldSkip) {
    return null
  }

  if (thumbnail === "Loading") {
    return <Box
        sx={{
          transition: 'transform 0.3s ease-in-out',
          padding: "10px",
          background: "transparent",
          width: "100%",
          height: "100%"
        }}
      >
        <Typography sx={{padding: "10px"}}>Loading ...</Typography>
      </Box>
  }

  const createViewer = () => {
    switch (resourceType) {
      case ResourceType.NONE: return null
      case ResourceType.IMAGE: return gridImageViewer(thumbnail, index, elementType === "project")
      case ResourceType.GLB_MODEL: return gridModelViewer(thumbnail) 
      case ResourceType.PDF: return gridPDFViewer(thumbnail)
      default: return null
    }
  }

  return (
    <Grid item xs={12} sm={3} md={3} lg={3} xl={3} key={index}>
      <Box sx={gridItemBackgroundStyling()} onClick={onClick}>
        {createViewer()}
        {
          elementType === "project" 
          ? <Box sx={{
              height: "100%",
              width: "100%",
              lineHeight: "100%",
              position: "absolute",
              display: "flex",
              justifyContent: "center", /* Centers content horizontally */
              alignItems: "center",    /* Centers content vertically */
              padding: "10px"
            }}>
              <Box sx={{
                display: "flex", 
                flexDirection:"column",
                padding: "10px",
                textAlign: "center", 
                color: "#FEFBE0", 
                fontSize: "20px", 
                width: "100%", 
                opacity: "90%",
                backgroundColor:"#2d2d2e"
              }}>
                {
                  projectTitle.split('\n').map((titlePhrase, index) => 
                    <Typography key={index+titlePhrase} sx={{
                      fontSize: "20px"
                    }}>
                      {titlePhrase}
                    </Typography>
                  )
                }
              </Box>
            </Box> 
          : null 
        }
      </Box>
    </Grid>
  );
};

export default ImageGridElement;