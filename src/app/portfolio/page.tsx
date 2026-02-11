'use client'

import { DropdownPortfolioBanners } from '@/components/DropdownPortfolioBanners';
import MouseTrackingSeahorse from '../../components/MouseTrackingSeahorse';
import "../globals.css";
import ImageGrid from '../../components/ImageGrid';
import { Box, Typography } from '@mui/material';
import { Directory, fetchPortfolioFiles } from "../../googleCloudUtils"
import { useEffect, useState } from 'react';
import { CustomEvents } from '../enums';
import { useCustomEventListener } from '@/hooks/UseCustomEventListener';
import { NavigationEvent } from '@/components/ResponsiveAppBar';

const PAGE_HREF = "portfolio"

export default function Portfolio() {
  const [tab, setTab] = useState(-1)
  const [portfolioFileStructure, setPortfolioFileStructure] = useState<Directory | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const emptyDirectory: Directory = {
    folders: {},
    files: [],
    pwd: ""
  }

  useEffect(() => {
    if (!loading) return

    (async () => {
      if (!loading) return

      try {
        const files = await fetchPortfolioFiles()
        setPortfolioFileStructure(files)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  })

  useCustomEventListener(
    typeof document === "undefined" ? undefined : document,
    CustomEvents.NAVBAR_NAVIGATION, 
    (event) => {
      if ((event as NavigationEvent).href === PAGE_HREF) {
        setTab(-1)
      }
    }
  )
  
	return (
		<>
			<DropdownPortfolioBanners onClick={setTab} openBanner={tab === -1}/>
      <MouseTrackingSeahorse hide={tab !== -1}/>

			<Box sx={{height: "100px"}}></Box>

      {
        loading
        ? <Typography>Loading...</Typography>
        : <>
          <ImageGrid hidden={tab !== 0} onClickBackButton={() => setTab(-1)} directory={portfolioFileStructure?.folders["projects"] || emptyDirectory} spacerImagePaths={["site-assets/nautilus_left.svg", "site-assets/nautilus_right.svg"]}/>
          <ImageGrid hidden={tab !== 1} onClickBackButton={() => setTab(-1)} directory={portfolioFileStructure?.folders["photography"] || emptyDirectory}  spacerImagePaths={["site-assets/copepod_left.svg", "site-assets/copepod_right.svg"]}/>
          <ImageGrid hidden={tab !== 2} onClickBackButton={() => setTab(-1)} directory={portfolioFileStructure?.folders["illustrations"] || emptyDirectory}  spacerImagePaths={["site-assets/seahorse_left.svg", "site-assets/seahorse_right.svg"]}/>
          <ImageGrid hidden={tab !== 3} onClickBackButton={() => setTab(-1)} directory={portfolioFileStructure?.folders["others"] || emptyDirectory}  spacerImagePaths={["site-assets/squid_left.svg", "site-assets/squid_left.svg"]}/>
        </>
      }
		</>
	)
};