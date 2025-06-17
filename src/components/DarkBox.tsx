import React from 'react';
import { Box } from '@mui/material';
import { theme } from '@/theme';

export const DarkBox = ({children, ...props}: any) => {
  return (
    <Box {...props} style={{
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.secondary.main,
      height: '100%',
      minHeight: '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4
    }}>
      {children}
    </Box>
  )
}