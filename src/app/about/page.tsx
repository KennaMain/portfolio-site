'use client'

import React from 'react';
import { Box, GridLegacy as Grid, Typography, Paper, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { DarkBox } from '../../components/DarkBox';
import { theme } from '@/theme';
import { filesList } from './carouselFilesList';
import Image from "next/image"

{/* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type */}
type FunctionType = Function

export default function About() {
  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
  const leftArrowImage = <Image width={50} height={50} alt="Show Previous Image" src="./site-assets/left_arrow.svg"/>
  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
  const rightArrowImage = <Image width={50} height={50} alt="Show Next Image" src="./site-assets/right_arrow.svg"/>

  // Custom arrow button component
  const CustomArrowButton = ({
    direction,
    onClick,
    children,
  }: {
    direction: 'left' | 'right';
    onClick: FunctionType;
    children: React.ReactNode;
  }) => (
    <IconButton
      onClick={() => onClick()}
      sx={{
        position: 'absolute',
        top: '50%',
        ...(direction === 'left' ? { left: 16 } : { right: 16 }),
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: theme.palette.common.white,
        '&:hover': {
          filter: "brightness(50%)"
        }
      }}
    >
      {children}
    </IconButton>
  );

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }} paddingTop={27}>
      <Grid container spacing={0}>
        {/* Left Column - Carousel */}
        <Grid item xs={12} md={6}>
          <DarkBox sx={{ height: '100%', display: 'flex' }}>
            <Carousel
              animation="fade"
              navButtonsAlwaysVisible
              NavButton={({ onClick, next }) => {
                const direction = next ? 'right' : 'left';
                return (
                  <CustomArrowButton direction={direction} onClick={onClick}>
                    {direction === 'left' ? leftArrowImage : rightArrowImage}
                  </CustomArrowButton>
                );
              }}
              indicatorContainerProps={{
                style: {
                  marginTop: '20px',
                  position: 'relative'
                }
              }}
              sx={{
                width: '100%',
                maxWidth: '600px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // This centers vertically
              }}
            >
              {filesList.map((item, index) => (
                <Box 
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: 'transparent',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%'
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
             Design Philosophy
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
            Design allows me to engage in visual problem solving, exercise my creativity, and think about information from multiple perspectives. I take composition of visual elements, readability of text, and the intended audience into consideration so that I can provide the best design outcomes. My goal is to communicate visually and create conversation between the design and the viewer.
            </Typography>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};