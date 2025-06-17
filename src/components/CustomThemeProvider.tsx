'use client'

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';

type Props = {
    children: React.ReactNode
}

export const CustomThemeProvider = ({children}: Props) => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
        {children}
    </ThemeProvider>
  );
};