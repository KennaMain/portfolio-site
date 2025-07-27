'use client'

import React from 'react';
import { Box, GridLegacy as Grid, Slide, Typography } from '@mui/material';
import Image from "next/image";
import { theme } from '@/theme';

export const DropdownPortfolioBanners = () => {
  const [openBanner, setOpenBanner] = React.useState(true);

  const bannerItems = [
    {
      id: 1,
      title: 'Illustrations',
      imageUrl: '/site-assets/home_button_illustrations.svg',
      href: '/portfolio/illustrations'
    },
    {
      id: 2,
      title: 'Layouts',
      imageUrl: '/site-assets/home_button_layouts.svg',
      href: '/portfolio/layouts'
    },
    {
      id: 3,
      title: 'Photography',
      imageUrl: '/site-assets/home_button_photography.svg',
      href: '/portfolio/photography'
    },
    {
      id: 4,
      title: 'Other',
      imageUrl: '/site-assets/home_button_other.svg',
      href: '/portfolio/other'
    },
  ];

    return (
      <Slide direction="down" timeout={1000} in={openBanner} mountOnEnter unmountOnExit>
        <Box 
          sx={{
            position: 'absolute',
            width: '100%',
            zIndex: 120,
            p: 2,
            borderRadius: 0
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {bannerItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Box 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(40px)',
                    },
                    transition: 'transform 0.5s ease',
                    background: theme.palette.background.paper,
                    color: theme.palette.secondary,
                    borderRadius: '10px'
                  }}
                  onClick={() => {
                    // Handle navigation
                    setOpenBanner(false)
                    handleNavigation(item.href)
                  }}
                >
                  <Box sx={{ 
                    position: 'relative', 
                    width: '100%',
                    paddingTop: '50%', // 1:2 ratio (height is half of width)
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}>
                    <Image 
                      src={item.imageUrl}
                      alt={item.title}
                      width={100}
                      height={100}
                      // fill
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
      </Slide>
    )
}