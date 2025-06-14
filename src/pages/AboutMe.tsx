import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { DarkBackgroundLeftOffsetBox } from '../components/DarkBackgroundLeftOffsetBox';

export const AboutMe = () => {
  const theme = useTheme();

  return (
    <DarkBackgroundLeftOffsetBox>
      <Grid container spacing={0}>
        {/* Left Column - Image */}
        <Grid item xs={12} md={5}>
          <img alt="Two happy nautliuses! :)" style={{width: "100%", height: "auto"}} src='./site-assets/about_nautiluses.png' />
        </Grid>

        {/* Right Column - Text */}
        <Grid item xs={12} md={6}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 700, color: theme.palette.secondary.light, transform: "rotate(-13deg)", fontSize: 60 }}>
            Who I am
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

          <Typography variant="body1" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
            &quot;The beauty of nature is that it&apos;s always changing, yet always constant.&quot;
          </Typography>
        </Grid>
      </Grid>
    </DarkBackgroundLeftOffsetBox>
  );
};