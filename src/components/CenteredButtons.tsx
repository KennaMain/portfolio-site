import React from 'react';
import { Box, Button, GridLegacy as Grid, Typography } from '@mui/material';
import { theme } from '@/theme';

// Define the type for button data
interface SquareButtonData {
  id: string;
  text: string;
  imageUrl: string;
}

// Styled button component to ensure square shape
{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
const SquareButton = ({children, ...props}: any) => {
  return (
    <Button {...props} style={{
      aspectRatio: '1/1',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      borderRadius: '8px',
      textTransform: 'none',

      backgroundColor: theme.palette.background.paper,
      color: theme.palette.secondary.light,
      // "&:hover": {
      //   color: theme.palette.primary.main,
      // }
    }}>
      {children}
    </Button>
  )
}

const CenteredButtons: React.FC = () => {
  // Sample data for the buttons
  const buttons: SquareButtonData[] = [
    {
      id: '1',
      text: 'Layouts',
      imageUrl: 'site-assets/home_button_layouts.png',
    },
    {
      id: '2',
      text: 'Illustrations',
      imageUrl: 'site-assets/home_button_illustrations.png',
    },
    {
      id: '3',
      text: 'Photography',
      imageUrl: 'site-assets/home_button_photography.png',
    },
    {
      id: '4',
      text: 'Other',
      imageUrl: 'site-assets/home_button_other.png',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // This centers vertically
        padding: '20px',
      }}
    >
      <Grid container spacing={4} justifyContent="center" maxWidth="md">
        {buttons.map((button) => (
          <Grid item key={button.id} xs={6} sm={3}>
            <SquareButton variant="outlined" fullWidth>
              <Typography variant="body1" gutterBottom>
                {button.text}
              </Typography>
              <Box
                component="img"
                src={button.imageUrl}
                alt={button.text}
                sx={{
                  width: '60%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </SquareButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CenteredButtons;