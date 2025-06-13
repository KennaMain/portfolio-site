import React from 'react';
import { Box } from '@mui/material';
import { DarkBox } from './DarkBox';

type Props = {
    children: any[]
}

export const DarkBackgroundLeftOffsetBox = ({children}: Props) => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }} paddingTop={19} paddingRight={16}>
      <DarkBox>
        <Box sx={{ paddingRight: 6, paddingLeft: 6, paddingBottom: 6, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {children}
        </Box>
      </DarkBox>
    </Box>
  );
};