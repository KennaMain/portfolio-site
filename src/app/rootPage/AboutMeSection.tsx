
import { Typography, Box } from "@mui/material"
import React from 'react';
import "../globals.css"

export const AboutMeSection = () => {
  return (
    <Box
      className="aboutMeSection"
      sx={{
        display: 'flex',
        flexDirection: 'row',        // side by side
        // height is auto; will be determined by the typography content
      }}
    >
      {/* Left: Typography content */}
      <Box sx={{ width: "66%", margin: '2rem' }}>
        <Typography sx={{ 
          fontSize: "5rem", 
          fontWeight: "bold",
        }}>
          ABOUT ME
        </Typography>
        <Typography style={{ padding: "0.2rem", fontSize: "x-large" }}>
          I have a background in both <span style={{fontWeight: "bold"}}>graphic design</span> and <span style={{fontWeight: "bold"}}>biology</span>, and I find that the two influence each other quite a bit.
        </Typography>
        <Typography style={{ padding: "0.2rem", fontSize: "x-large" }}>
          As a graphic designer I look to incorporate observation, research, visual interest, flow, surprise, and storytelling. My goal is to inspire conversation, inform, and share with others through design.
        </Typography>
      </Box>

      {/* Right: Image box – stretches to match the left box height */}
      <Box
        sx={{
          width: "33%",
          overflow: "hidden",       // hides any overflow from the image
          // height is auto, flex stretch will make it fill the container
        }}
      >
        <img
          src="/site-assets/me.png"
          alt="Me"
          style={{
            height: "106%",
            width: "106%",
            marginTop: "-3%",
            objectFit: "contain",     // or "contain" if you want the whole image visible
          }}
        />
      </Box>
    </Box>
  )
}