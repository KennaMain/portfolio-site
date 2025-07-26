import React from 'react';
import { Box, GridLegacy as Grid, Typography } from '@mui/material';
import { DarkBackgroundLeftOffsetBox } from '../../components/DarkBackgroundLeftOffsetBox';
import { theme } from '@/theme';
import "../globals.css";

export default function Contact() {
  console.log(theme)

  return (
    <DarkBackgroundLeftOffsetBox>
      <Grid container spacing={0}>
        {/* Left Column - Contact Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: theme.palette.secondary.light }}>
            Contact Me
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
            Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
            Key Features
          </Typography>

          <Box component="ul" sx={{ pl: 3, mb: 4 }}>
            <Typography component="li" paragraph sx={{ fontSize: '1.1rem' }}>
              High-quality imagery
            </Typography>
            <Typography component="li" paragraph sx={{ fontSize: '1.1rem' }}>
              Responsive design
            </Typography>
            <Typography component="li" paragraph sx={{ fontSize: '1.1rem' }}>
              Easy navigation
            </Typography>
          </Box>
        </Grid>

        {/* Right Column - Image */}
        <Grid item xs={12} md={6}>
          <img alt="Seahorse calling to invite you over for a boardgame party with all their friends" style={{width: "100%", height: "auto"}} src='./site-assets/contact_seahorse.svg' />
        </Grid>
      </Grid>
    </DarkBackgroundLeftOffsetBox>
  );
};