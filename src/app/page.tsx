'use client'

import { Button, Typography, Box } from "@mui/material"
import React, { useEffect, useRef, useState } from 'react';
import { Directory, fetchPortfolioFiles } from "@/googleCloudUtils"
import ImageGrid from "@/components/ImageGrid"

const color1 = "#eadfcb"
const color2 = "#e3af7a"
const color3 = "#535353"

const backgroundColor1 = "#292929"

const menuBarButtonStyle: any = {color: color2, fontWeight: "bold", fontSize: "x-large", textTransform: "none", padding: "1rem"}



export default function Home() {
  const [portfolioFileStructure, setPortfolioFileStructure] = useState<Directory | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const refPortfolio = useRef(null)
  const refAbout     = useRef(null)

  const scrollPageTo = (ref?: React.RefObject<any>) => {
    if (!ref) {
      window.scrollTo(0, 0)
    } else {
      ref.current.scrollIntoView()
    }
  }

  const emptyDirectory: Directory = {
    folders: {},
    files: [],
    pwd: ""
  }

  useEffect(() => {
    if (!loading) return

    (async () => {
      if (!loading) return

      try {
        const files = await fetchPortfolioFiles()
        setPortfolioFileStructure(files)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  })

  return (
    <div style={{backgroundImage: 'url("/site-assets/home_background.webp")'}}>
      {/* menu bar */}
      <div style={{ height: "fit-content", width: "100%", display: "flex", flexDirection: "row-reverse" }}>
        <span style={{ float: "right", paddingRight: "5rem" }}>
          <Button style={menuBarButtonStyle} onClick={() => scrollPageTo()}            >Home</Button>
          <Button style={menuBarButtonStyle} onClick={() => scrollPageTo(refPortfolio)}>Portfolio</Button>
          <Button style={menuBarButtonStyle} onClick={() => scrollPageTo(refAbout)}    >About</Button>
        </span>
      </div>

      {/* title */}
      <div style={{height: "40rem", display: "flex", flexDirection: "row-reverse", alignItems: "center", fontSize: "3rem" }}>
          <div style={{color: color1, padding: "2rem"}}>
            <Typography style={{padding: "0.2rem", fontSize: "xx-large", fontWeight: "bold"}}>CONSTRUCT</Typography>
            <Typography style={{padding: "0.2rem", fontSize: "xx-large", fontWeight: "bold"}}>COMPOSE</Typography>
            <Typography style={{padding: "0.2rem", fontSize: "xx-large", fontWeight: "bold"}}>COMMUNICATE</Typography>
            <Typography style={{padding: "0.2rem", paddingTop: "1.5rem", fontSize: "xx-large"}}>
              It's what I do.
            </Typography>
          </div>
      </div>

      {/* Spacer */}
      <Box ref={refPortfolio} sx={{ height: "2rem" }}></Box>
      
      {/* Portfolio Section */}
      <Box id="portfolio section" sx={{ display: 'flex', background: "#292929D0" }}>
        {/* Left side title - narrow box */}
        <Box 
          id="title container" 
          sx={{ 
            // adjust these values to change how much width the title takes up vs how much width the tiles take up
            // maxWidth: '6rem',
            // minWidth: '4rem',
            width: "20%",

            position: 'relative', // Creates positioning context for SVG
            gridColumn: '1',
            gridRow: '1',
          }}
        >
          {/* This inner box will match the portfolio section's height */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: "center", 
              alignItems: "center",
              padding: "10px",
            }}
          >
            <svg 
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain', // Maintains aspect ratio within bounds
              }}
              // format <x1, y1, x2, y2> 
              // adjust x1 and x2 to control how zoomed in the text is
              viewBox="100 0 600 3427" 
              version="1.1"
            >
              <g>
                <path d="M576.646,387.061l-0,-202.125l-374.325,0l0,94.5l130.2,0l0,107.625c0,63 31.5,95.025 92.925,95.025l58.275,0c61.425,0 92.925,-32.025 92.925,-95.025Zm-135.975,0.525c-20.475,0 -27.825,-7.35 -27.825,-28.875l0,-79.275l83.475,0l0,79.275c0,21.525 -6.825,28.875 -27.825,28.875l-27.825,0Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M581.896,758.758l0,-118.125c0,-63 -31.5,-95.025 -92.925,-95.025l-198.975,0c-61.425,0 -92.925,32.025 -92.925,95.025l0,118.125c0,63 31.5,95.025 92.925,95.025l198.975,0c61.425,0 92.925,-32.025 92.925,-95.025Zm-108.15,0.525l-168.525,0c-20.475,0 -27.825,-7.35 -27.825,-28.875l-0,-61.425c0,-21.525 7.35,-28.875 27.825,-28.875l168.525,0c21,0 27.825,7.35 27.825,28.875l0,61.425c0,21.525 -6.825,28.875 -27.825,28.875Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M202.321,1168.78l0,110.25l138.6,-94.5c11.55,36.225 40.425,54.075 86.625,54.075l56.175,0c61.425,0 92.925,-32.025 92.925,-95.55l0,-203.175l-374.325,0l0,94.5l132.825,0l0,43.05l-132.825,91.35Zm294,-134.4l0,80.325c0,22.05 -6.825,29.4 -27.825,29.4l-25.725,0c-20.475,0 -27.3,-7.35 -27.3,-29.4l0,-80.325l80.85,0Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M576.646,1598.752l0,-307.65l-80.325,0l0,106.575l-294,0l0,94.5l294,0l0,106.575l80.325,0Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M496.321,1929.499l80.325,0l0,-265.65l-374.325,0l0,94.5l139.65,0l0,149.1l80.325,0l0,-149.1l74.025,0l0,171.15Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M581.896,2208.796l0,-118.125c0,-63 -31.5,-95.025 -92.925,-95.025l-198.975,0c-61.425,0 -92.925,32.025 -92.925,95.025l0,118.125c0,63 31.5,95.025 92.925,95.025l198.975,0c61.425,0 92.925,-32.025 92.925,-95.025Zm-108.15,0.525l-168.525,0c-20.475,0 -27.825,-7.35 -27.825,-28.875l0,-61.425c0,-21.525 7.35,-28.875 27.825,-28.875l168.525,0c21,0 27.825,7.35 27.825,28.875l0,61.425c0,21.525 -6.825,28.875 -27.825,28.875Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M282.646,2484.418l294,0l0,-94.5l-374.325,0l0,259.875l80.325,0l-0,-165.375Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M202.321,2715.415l0,94.5l374.325,0l0,-94.5l-374.325,0Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
                <path d="M581.896,3109.162l-0,-118.125c0,-63 -31.5,-95.025 -92.925,-95.025l-198.975,0c-61.425,0 -92.925,32.025 -92.925,95.025l0,118.125c0,63 31.5,95.025 92.925,95.025l198.975,0c61.425,0 92.925,-32.025 92.925,-95.025Zm-108.15,0.525l-168.525,0c-20.475,0 -27.825,-7.35 -27.825,-28.875l0,-61.425c0,-21.525 7.35,-28.875 27.825,-28.875l168.525,0c21,0 27.825,7.35 27.825,28.875l0,61.425c0,21.525 -6.825,28.875 -27.825,28.875Z" style={{"fill":"#eadfcb", "fillRule":"nonzero"}} />
              </g>
            </svg>
          </Box>
        </Box>

        {/* Right side - takes remaining width */}
        <Box sx={{ 
          flexGrow: 1,  // Takes up remaining space
          width: 0,      // Helps with flexbox calculations
          justifyContent: "left", 
          alignItems: "center", 
          height: "100%", 
          // mt: "-4rem"    // margin-top equivalent
          padding: "0px",
          margin: "0px"
        }}>
          {/* Button Grid */}
          {loading
            ? <Typography>Loading...</Typography>
            : <ImageGrid hidden={false} directory={portfolioFileStructure ?? emptyDirectory}/>
          }
        </Box>
      </Box>

      {/* Spacer */}
      <Box ref={refAbout} sx={{ height: "2rem" }}></Box>

      {/* About Me Section */}
      <Box sx={{ color: color3, display: 'flex', padding: "2rem", background: "#C9C9C9ee", height: "fit-children", flexDirection: "column" }}>
        <Typography sx={{ 
          fontSize: "5rem", 
          color: color3, 
          fontWeight: "bold",
        }}>
          ABOUT ME
        </Typography>
        <Typography style={{padding: "0.2rem", fontSize: "x-large"}}>
          I have a background in both <span style={{fontWeight: "bold"}}>graphic design</span> and <span style={{fontWeight: "bold"}}>biology</span>, and I find that the two influence each other quite a bit.
        </Typography>
        <Typography style={{padding: "0.2rem", fontSize: "x-large"}}>
          As a graphic designer I look to incorporate observation, research, visual interest, flow, surprise, and storytelling. My goal is to inspire conversation, inform, and share with others through design.
        </Typography>
      </Box>

      {/* Spacer */}
      <Box sx={{ height: "2rem" }}></Box>

      {/* About Me Section */}
      <Box sx={{ display: 'flex', padding: "2rem", background: "#292929D0", height: "fit-children", flexDirection: "column" }}>
        <Typography sx={{ 
          fontSize: "5rem", 
          color: color2, 
          fontWeight: "bold",
        }}>
          CONTACT
        </Typography>
        <Typography style={{ color: color1, padding: "0.2rem", fontSize: "xx-large", fontWeight: "bold" }}>
          LinkedIn
        </Typography>
        <Typography style={{ color: color1, padding: "0.2rem", fontSize: "large", fontWeight: "bold" }}>
          <a href="https://www.linkedin.com/in/kenna-main-design">www.linkedin.com/in/kenna-main-design</a>
        </Typography>
        <Typography style={{ color: color1, padding: "0.2rem", fontSize: "xx-large", fontWeight: "bold" }}>
          Email
        </Typography>
        <Typography style={{ color: color1, padding: "0.2rem", fontSize: "large", fontWeight: "bold" }}>
          <a href="mailto:Kenna.m@icloud.com">Kenna.m@icloud.com</a>
        </Typography>
      </Box>

      {/* Spacer */}
      <Box sx={{ height: "2rem" }}></Box>
      <Box sx={{ height: "2rem" }}></Box>

    </div>
  )
}
