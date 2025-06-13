import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const DarkBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  height: '100%',
  minHeight: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4)
}));
