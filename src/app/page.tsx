'use client'

import { Typography, Box } from "@mui/material"
import React, { useEffect, useRef, useState } from 'react';
import { Directory, fetchPortfolioFiles } from "@/getProntoUtils"
import ImageGrid from "@/components/ImageGrid"
import "./globals.css"
import { HeroImage } from "./rootPage/HeroImage";
import { PortfolioSection } from "./rootPage/PortfolioSection";
import { AboutMeSection } from "./rootPage/AboutMeSection";
import { ContactSection } from "./rootPage/ContactSection";

const menuBarButtonStyle: any = {fontWeight: "bold", fontSize: "x-large", textTransform: "none", padding: "1rem"}

export default function Home() {
  const [portfolioFileStructure, setPortfolioFileStructure] = useState<Directory | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const refPortfolio = useRef(null)
  const refAbout     = useRef(null)
  const refContact   = useRef(null)

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
        if (files.folders["Portfolio"]) {
          setPortfolioFileStructure(files.folders["Portfolio"])
        } else {
          setPortfolioFileStructure(files)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  })

  return (
    <div className="page">
      
      <HeroImage/>

      {/* menu bar */}
      <div style={{ height: "fit-content", width: "100%", display: "flex", flexDirection: "row-reverse", position: 'absolute', top: '0px' }}>
        <span style={{ float: "right", paddingRight: "10%" }}>
          <button style={menuBarButtonStyle} className="menuBarButton" onClick={() => scrollPageTo(refPortfolio)}>Portfolio</button>
          <button style={menuBarButtonStyle} className="menuBarButton" onClick={() => scrollPageTo(refAbout)}    >About</button>
          <button style={menuBarButtonStyle} className="menuBarButton" onClick={() => scrollPageTo(refContact)}  >Contact</button>
        </span>
      </div>

      <Box ref={refPortfolio} sx={{ height: "0rem" }}></Box>
      
      <PortfolioSection 
        loading={loading} 
        portfolioFileStructure={portfolioFileStructure} 
        emptyDirectory={emptyDirectory}
      />

      <Box ref={refAbout} sx={{ height: "0rem" }}></Box>

      <AboutMeSection/>

      {/* Spacer */}
      <Box ref={refContact} sx={{ height: "0rem" }}></Box>

      <ContactSection/>

      {/* Spacer */}
      <Box sx={{ height: "4rem" }}></Box>

    </div>
  )
}
