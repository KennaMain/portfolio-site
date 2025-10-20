'use client'

import React from 'react';
import { Box, GridLegacy as Grid, Slide, Typography, useMediaQuery } from '@mui/material';
import Image from "next/image";
import { theme } from '@/theme';

type Props = {
  onClick: (index: number) => void,
  openBanner: boolean
}

type BannerItem = {
  id: number
  title: string
  imageUrl: string
}

export const DropdownPortfolioBanners = ({onClick, openBanner}: Props) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  const bannerItems: BannerItem[] = [
    {
      id: 0,
      title: 'Projects',
      imageUrl: '/site-assets/home_button_illustrations.svg',
    },
    {
      id: 1,
      title: 'Photography',
      imageUrl: '/site-assets/home_button_layouts.svg',
    },
    {
      id: 2,
      title: 'Illustrations',
      imageUrl: '/site-assets/home_button_photography.svg',
    },
    {
      id: 3,
      title: 'Other',
      imageUrl: '/site-assets/home_button_other.svg',
    },
  ];

  const mainComponent = (
    <Box 
      sx={{
        display: isSmallScreen && !openBanner ? 'none' : undefined,
        position: 'absolute',
        width: '100%',
        zIndex: 120,
        p: 2,
        borderRadius: 0,
        marginTop: isSmallScreen ? '150px' : undefined
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {bannerItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={12} md={3} lg={3}>
            <Box 
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: {xs: undefined, md: 'translateY(40px)'},
                },
                transition: 'transform 0.5s ease',
                background: theme.palette.background.paper,
                color: theme.palette.secondary,
                borderRadius: '10px',
                width: isSmallScreen ? "300px" : undefined,
                aspectRatio: "1",
                margin: {xs: '0 auto', sm: '0 auto', md: '0'}, // Center horizontally for small screens
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center vertically for all content
                alignItems: 'center',
              }}
              onClick={() => {
                onClick(item.id)
              }}
            >
              <Box sx={{ 
                position: 'relative', 
                width: '100%',
                paddingTop: {xs: undefined, md: '50%'}, // 1:2 ratio (height is half of width)
                mb: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
              }}>
                <Image 
                  src={item.imageUrl}
                  alt={item.title}
                  width={100}
                  height={100}
                  style={{ objectFit: 'fill', borderRadius: '4px' }}
                />
              </Box>
              <Typography sx={{color: theme.palette.secondary.light}} variant="h6" align="center">
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )

  if (isSmallScreen) {
    console.log("returning nonslider")
    return mainComponent
  } else {
    console.log("returning slider")
    return (
      <Slide direction={"down"} timeout={1000} in={openBanner} mountOnEnter unmountOnExit>
        {mainComponent}
      </Slide>
    )
  }
}