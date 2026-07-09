
import { Typography, Box } from "@mui/material"
import React from 'react';
import "../globals.css"

export const ContactSection = () => {
  return (
    <Box 
      className="contactMeSection"
      sx={{ 
        display: 'flex', 
        padding: "2rem", 
        height: "fit-children", 
        flexDirection: "column" 
      }}
    >
      <Typography sx={{ 
        fontSize: "5rem", 
        fontWeight: "bold",
      }}>
        CONTACT
      </Typography>
      <Typography style={{ padding: "0.2rem", fontSize: "xx-large", fontWeight: "bold" }}>
        LinkedIn
      </Typography>
      <Typography style={{ padding: "0.2rem", fontSize: "large", fontWeight: "bold" }}>
        <a href="https://www.linkedin.com/in/kenna-main-design">www.linkedin.com/in/kenna-main-design</a>
      </Typography>
      <Typography style={{ padding: "0.2rem", fontSize: "xx-large", fontWeight: "bold" }}>
        Email
      </Typography>
      <Typography style={{ padding: "0.2rem", fontSize: "large", fontWeight: "bold" }}>
        <a href="mailto:Kenna.m@icloud.com">Kenna.m@icloud.com</a>
      </Typography>
    </Box>
  )
}