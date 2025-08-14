'use client'

import React from 'react';
import { GridLegacy as Grid, Typography } from '@mui/material';
import { DarkBackgroundLeftOffsetBox } from '../../components/DarkBackgroundLeftOffsetBox';
import { theme } from '@/theme';
import "../globals.css";

export default function AboutMe() {
  return (
    <DarkBackgroundLeftOffsetBox>
      <Grid container spacing={0}>
        {/* Left Column - Image */}
        <Grid item xs={12} md={4}>
          <img alt="Two happy nautliuses! :)" style={{width: "100%", height: "auto", paddingTop:"30px", paddingRight: "20px"}} src='./site-assets/about_nautiluses.svg' />
        </Grid>

        {/* Right Column - Text */}
        <Grid item xs={12} md={6}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 700, color: theme.palette.secondary.light, transform: "rotate(-13deg)", fontSize: 60, paddingTop: "10px", paddingBottom: "50px" }}>
            Who I am
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
          I have a background in both graphic design and biology, and I find that the two influence each other quite a bit. I received my bachelors of science at the University of South Florida In 2023. It was there that I majored in marine biology and minored in studio art. I found so much fulfillment in my studio art courses, that I then decided to pursue a certificate of graphic design, which I received in 2025 from the Rhode Island school of design. 
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>    
Much of my design inspiration comes from observations I make in my environment and biological concepts. I am inspired by the morphology and biological functions observed in nature, so when I can incorporate these into design work, I do. It is often a design goal of mine to reference or educate about such interesting, beautiful, and strange scientific concepts through my work. 
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
As a graphic designer I look to incorporate observation, research, visual interest, flow, surprise, and storytelling. My goal is to inspire conversation, inform, and share with others through design.
          </Typography>

        </Grid>
      </Grid>
    </DarkBackgroundLeftOffsetBox>
  );
};