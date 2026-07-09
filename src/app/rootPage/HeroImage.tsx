'use client'

import { useTheme } from "next-themes"

export const HeroImage = () => {
  const {theme} = useTheme()

  const image = theme === 'light'
    ? '/site-assets/hero image.png'
    : '/site-assets/hero-image-dark-mode.png'

  return (
    <img src={image} style={{width: '100%', marginBottom: '-4px'}}/>
  )
}