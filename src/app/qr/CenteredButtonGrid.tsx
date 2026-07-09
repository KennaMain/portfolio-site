import React from 'react';
import { Box, Button, GridLegacy as Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface SquareButtonData {
  text: string;
  imageUrl: string;
  url: string;
}

interface Props {
  buttons: SquareButtonData[]
}

// Styled button component to ensure square shape
const SquareButton = styled(Button)({
  aspectRatio: '1/1',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  borderRadius: '8px',
  textTransform: 'none',
});

const CenteredButtonGrid = ({buttons}: Props) => {
  const handleButtonClick = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

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
        {buttons.map((button, index) => (
          <Grid item key={index} xs={6} sm={3}>
            <SquareButton variant="outlined" fullWidth onClick={() => handleButtonClick(button.url)}>
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
            <Typography variant="body1" gutterBottom>
                {button.text}
              </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CenteredButtonGrid;