'use client'

import { DropdownPortfolioBanners } from '@/components/DropdownPortfolioBanners';
import MouseTrackingSeahorse from '../../components/MouseTrackingSeahorse';
import "../globals.css";
import ImageGrid from '../../components/ImageGrid';
import { Box } from '@mui/material';
import { imagePaths as tab1FilesList } from "./tab1FilesList"
import { imagePaths as tab2FilesList } from "./tab2FilesList"
import { imagePaths as tab3FilesList } from "./tab3FilesList"
import { imagePaths as tab4FilesList } from "./tab4FilesList"
import { useState } from 'react';
import { CustomEvents } from '../enums';
import { useCustomEventListener } from '@/hooks/UseCustomEventListener';

export default function Portfolio() {
  const [tab, setTab] = useState(-1)

  useCustomEventListener(
    document,
    CustomEvents.NAVBAR_NAVIGATION, 
    () => {
      setTab(-1)
    }
  )
  
	return (
		<>
			<DropdownPortfolioBanners onClick={setTab}/>
			<MouseTrackingSeahorse/>
			<Box sx={{height: "100px"}}></Box>

			<ImageGrid hidden={tab !== 0} imagePaths={tab1FilesList}/>
			<ImageGrid hidden={tab !== 1} imagePaths={tab2FilesList}/>
			<ImageGrid hidden={tab !== 2} imagePaths={tab3FilesList}/>
			<ImageGrid hidden={tab !== 3} imagePaths={tab4FilesList}/>
		</>
	)
};
