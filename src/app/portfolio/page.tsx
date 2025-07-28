'use client'

import { DropdownPortfolioBanners } from '@/components/DropdownPortfolioBanners';
import MouseTrackingSeahorse from '../../components/MouseTrackingSeahorse';
import "../globals.css";
import ImageGrid from '../../components/ImageGrid';
import { Box, Slide } from '@mui/material';
import { imagePaths as tab1FilesList } from "./tab1FilesList"
import { imagePaths as tab2FilesList } from "./tab2FilesList"
import { imagePaths as tab3FilesList } from "./tab3FilesList"
import { imagePaths as tab4FilesList } from "./tab4FilesList"
import { useState } from 'react';
import { CustomEvents } from '../enums';
import { useCustomEventListener } from '@/hooks/UseCustomEventListener';
import { NavigationEvent } from '@/components/ResponsiveAppBar';

const PAGE_HREF = "portfolio"

export default function Portfolio() {
  const [tab, setTab] = useState(-1)

  useCustomEventListener(
    document,
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

			<ImageGrid hidden={tab !== 0} imagePaths={tab1FilesList} spacerImagePaths={["site-assets/nautilus_left.svg", "site-assets/nautilus_right.svg"]}/>
			<ImageGrid hidden={tab !== 1} imagePaths={tab2FilesList} spacerImagePaths={["site-assets/copepod_left.svg", "site-assets/copepod_right.svg"]}/>
			<ImageGrid hidden={tab !== 2} imagePaths={tab3FilesList} spacerImagePaths={["site-assets/seahorse_left.svg", "site-assets/seahorse_right.svg"]}/>
			<ImageGrid hidden={tab !== 3} imagePaths={tab4FilesList} spacerImagePaths={["site-assets/squid_left.svg", "site-assets/squid_left.svg"]}/>
		</>
	)
};
