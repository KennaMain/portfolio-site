import React from 'react';
import { Box } from '@mui/material';
import { theme } from '@/theme';

{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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