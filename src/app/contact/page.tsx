import React from 'react';
import { Box, GridLegacy as Grid, Typography } from '@mui/material';
import { DarkBackgroundLeftOffsetBox } from '../../components/DarkBackgroundLeftOffsetBox';
import { theme } from '@/theme';
import "../globals.css";
import MouseTrackingEye from '@/components/MouseTrackingEye';

export default function Contact() {
  return (
    <DarkBackgroundLeftOffsetBox>
      <Grid container spacing={0}>
        {/* Left Column - Contact Info */}
        <Grid item xs={12} md={7}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: theme.palette.secondary.light }}>
            Contact Me
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
            email
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
            phone
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
            Linkdin
          </Typography>
        </Grid>

        {/* Right Column - Image */}
        <Grid item xs={12} md={5}>
          <Box sx={{height: '20px'}}></Box>
          <Box sx={{position: 'relative'}}>
            <Box sx={{width:"100%", height:"100%"}}> {/* This box exists to size the eye relative to the seahorse - it will have the same dimensions as the seahorse, so it's like the eye is parented to the seahorse image instead. */}
              <img alt="Seahorse calling to invite you over for a boardgame party with all their friends" style={{width: "100%", height: "auto"}} src='./site-assets/contact_seahorse.svg'/>
              <MouseTrackingEye 
                src="site-assets/seahorse_eye.svg"
                alt="Seahorse Eye"
                top={"7.5%"}
                left={"41.4%"}
                zIndex={100}
                width={"5.1799%"}
                height={"3.347%"}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DarkBackgroundLeftOffsetBox>
  );
};