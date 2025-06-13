import React from 'react';
import { Box, Grid, Typography, Paper, useTheme } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/system';
import { DarkBox } from '../components/DarkBox';

// Sample carousel items
const carouselItems = [
  {
    id: 1,
    imageUrl: 'https://source.unsplash.com/random/800x600?nature',
    altText: 'Nature 1'
  },
  {
    id: 2,
    imageUrl: 'https://source.unsplash.com/random/800x600?mountain',
    altText: 'Nature 2'
  },
  {
    id: 3,
    imageUrl: 'https://source.unsplash.com/random/800x600?water',
    altText: 'Nature 3'
  }
];

export const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }} paddingTop={17}>
      <Grid container spacing={0}>
        {/* Left Column - Carousel */}
        <Grid item xs={12} md={6}>
          <DarkBox>
            <Carousel
              animation="fade"
              navButtonsAlwaysVisible
              indicatorContainerProps={{
                style: {
                  marginTop: '20px',
                  position: 'relative'
                }
              }}
              sx={{
                width: '100%',
                maxWidth: '600px'
              }}
            >
              {carouselItems.map((item) => (
                <Box key={item.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: 'transparent',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.altText}
                      style={{
                        maxHeight: '500px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        borderRadius: theme.shape.borderRadius
                      }}
                    />
                  </Paper>
                </Box>
              ))}
            </Carousel>
          </DarkBox>
        </Grid>

        {/* Right Column - Text Content */}
        <Grid item xs={12} md={6}>
          <Box sx={{ paddingRight: 6, paddingLeft: 6, paddingBottom: 6, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Discover Our World
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};