'use client'

import { DropdownPortfolioBanners } from '@/components/DropdownPortfolioBanners';
import MouseTrackingSeahorse from '../../components/MouseTrackingSeahorse';
import "../globals.css";
import ImageGrid from '../../components/ImageGrid';
import { Box, Typography } from '@mui/material';
import { Directory, fetchPortfolioFiles } from "../../awsUtils"
import { useEffect, useState } from 'react';
import { CustomEvents } from '../enums';
import { useCustomEventListener } from '@/hooks/UseCustomEventListener';
import { NavigationEvent } from '@/components/ResponsiveAppBar';
import { useSearchParams, redirect } from 'next/navigation';

const PAGE_HREF = "portfolio"

export default function Portfolio() {
  const params = useSearchParams();
  const [tab, setTabState] = useState(-1)
  const [selectedSubDirectory, setSelectedSubDirectory] = useState<string[] | undefined>(undefined)
  const [portfolioFileStructure, setPortfolioFileStructure] = useState<Directory | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const emptyDirectory: Directory = {
    folders: {},
    files: [],
    pwd: ""
  }

  const setQueryParams = (tabNum: number, subdirectory?: string) => {
    if (tabNum === tab && subdirectory === selectedSubDirectory) return

    if (tabNum === -1) redirect('/portfolio')
    if (subdirectory?.startsWith('/')) subdirectory = subdirectory.substring(1)

    const subdir = subdirectory ? `&subdirectory=${subdirectory}` : ""
    redirect(`/portfolio?tab=${tabNum}` + subdir)
  }

  useEffect(() => {
    const tabParam = params.get("tab")
    if (!tabParam) return
    console.log('boutta parse 2: ' + tabParam)
    setTabState(JSON.parse(tabParam) as number)
  }, [params.get("tab")])

  useEffect(() => {
    const subdirParam = params?.get("subdirectory") as string | undefined
    if (!subdirParam) {
      setSelectedSubDirectory(undefined)
      return
    } else {
      let subdir = subdirParam.split("/")
      if (subdir[0] === 'projects') subdir = subdir.slice(1)
      setSelectedSubDirectory(subdir)
    }
  }, [params.get("subdirectory")])

  // load portfolio files list (only do this once)
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
        const queryParamTab = params.get("tab")
        const queryParamSubdirectory = params.get("subdirectory") ?? undefined
        console.log('boutta parse 1')
        setQueryParams(
          queryParamTab ? JSON.parse(queryParamTab) : -1, 
          queryParamTab ? queryParamSubdirectory : undefined // note: only set subdirectory if tab is specified
        )
      }
    }
  )
  
	return (
		<>
			<DropdownPortfolioBanners onClick={setQueryParams} openBanner={tab === -1}/>
      <MouseTrackingSeahorse hide={tab !== -1}/>

			<Box sx={{height: "100px"}}></Box>

      {
        loading
        ? <Typography>Loading...</Typography>
        : <>
          <ImageGrid hidden={tab !== 0} supremeOverlordOnClickBackButton={() => setQueryParams(tab, selectedSubDirectory?.slice(0, -1)?.join())} onClickBackButton={() => setQueryParams(-1)} directory={portfolioFileStructure?.folders["projects"] || emptyDirectory}       selectedSubDirectory={selectedSubDirectory} onClick={(subdirectory, isFolder) => {if (isFolder) setQueryParams(tab, subdirectory) }}/>
          <ImageGrid hidden={tab !== 1} supremeOverlordOnClickBackButton={() => setQueryParams(tab, selectedSubDirectory?.slice(0, -1)?.join())} onClickBackButton={() => setQueryParams(-1)} directory={portfolioFileStructure?.folders["photography"] || emptyDirectory}    selectedSubDirectory={selectedSubDirectory} onClick={(subdirectory, isFolder) => {if (isFolder) setQueryParams(tab, subdirectory) }}/>
          <ImageGrid hidden={tab !== 2} supremeOverlordOnClickBackButton={() => setQueryParams(tab, selectedSubDirectory?.slice(0, -1)?.join())} onClickBackButton={() => setQueryParams(-1)} directory={portfolioFileStructure?.folders["illustrations"] || emptyDirectory}  selectedSubDirectory={selectedSubDirectory} onClick={(subdirectory, isFolder) => {if (isFolder) setQueryParams(tab, subdirectory) }}/>
          <ImageGrid hidden={tab !== 3} supremeOverlordOnClickBackButton={() => setQueryParams(tab, selectedSubDirectory?.slice(0, -1)?.join())} onClickBackButton={() => setQueryParams(-1)} directory={portfolioFileStructure?.folders["others"] || emptyDirectory}         selectedSubDirectory={selectedSubDirectory} onClick={(subdirectory, isFolder) => {if (isFolder) setQueryParams(tab, subdirectory) }}/>
        </>
      }
		</>
	)
};