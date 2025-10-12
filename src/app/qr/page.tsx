'use client'

import React from 'react';
// import { theme } from '@/theme';
import "../globals.css";
import CenteredButtonGrid from '@/components/CenteredButtonGrid';

export default function AboutMe() {
  return (
    <CenteredButtonGrid buttons={[
      {
        text: 'Etsy',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg',
        url: 'https://www.etsy.com/shop/KennaMainDesigns'
      },
      {
        text: 'Instagram',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
        url: 'https://www.instagram.com/thatssophotograph/'
      },
    ]}/>
  );
};