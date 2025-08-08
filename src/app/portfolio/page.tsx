'use client'

import { DropdownPortfolioBanners } from '@/components/DropdownPortfolioBanners';
import MouseTrackingSeahorse from '../../components/MouseTrackingSeahorse';
import "../globals.css";
import ImageGrid from '../../components/ImageGrid';
import { Box, Button, Typography } from '@mui/material';
import { Directory, fetchPortfolioFiles, Project, projects as tab1Projects } from "./tab1FilesList"
import { imagePaths as tab2FilesList } from "./tab2FilesList"
import { imagePaths as tab3FilesList } from "./tab3FilesList"
import { imagePaths as tab4FilesList } from "./tab4FilesList"
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

        console.log(files)
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
          <ImageGrid hidden={tab !== 0} directory={portfolioFileStructure?.folders["projects"] || emptyDirectory} spacerImagePaths={["site-assets/nautilus_left.svg", "site-assets/nautilus_right.svg"]}/>
          <ImageGrid hidden={tab !== 1} directory={portfolioFileStructure?.folders["photography"] || emptyDirectory}  spacerImagePaths={["site-assets/copepod_left.svg", "site-assets/copepod_right.svg"]}/>
          <ImageGrid hidden={tab !== 2} directory={portfolioFileStructure?.folders["illustrations"] || emptyDirectory}  spacerImagePaths={["site-assets/seahorse_left.svg", "site-assets/seahorse_right.svg"]}/>
          <ImageGrid hidden={tab !== 3} directory={portfolioFileStructure?.folders["others"] || emptyDirectory}  spacerImagePaths={["site-assets/squid_left.svg", "site-assets/squid_left.svg"]}/>
        </>
      }
		</>
	)
};

// const TabPresentation = ({filesList, spacerImagePaths, hidden}: {filesList: Project[] | string[], spacerImagePaths: string[], hidden: boolean}) => {
//   const [projectIndex, setProjectIndex] = useState(-1)

//   useCustomEventListener(
//     typeof document === "undefined" ? undefined : document,
//     CustomEvents.NAVBAR_NAVIGATION, 
//     (event) => {
//       if ((event as NavigationEvent).href === PAGE_HREF) {
//         setProjectIndex(-1)
//       }
//     }
//   )

//   if (typeof filesList[0] === "string") {
//     return <ImageGrid hidden={hidden} imagePaths={filesList as string[]} spacerImagePaths={spacerImagePaths}/>
//   }

//   // need to redo this - accept a Directory, show projects first (as clickable things with a thumbnail (note: the title/description/thumbnail for each project will be found)), then show files
//   /*
//   const directory = {} as Directory
//   const elem = <>
//     {Object.keys(directory.folders).map(folderName => <ImageGridElement filepath={figure it out (if there's a metadata.json file in the passed directory's "files" list, use the title and thumbnail from there, otherwise use the default title)} defaultTitle={folderName} directory=directory.folders[foldername]>)}
//     {directory.files.map(filepath => <ImageGridElement filepath background={none} directory={undefined}>)}
//   </>
//   */

//   const projectList = filesList as Project[]
//   const thumbnails = projectList.map(project => project.thumbnail ?? project.files[0])
//   if (projectIndex < 0) {
//     return <ImageGrid 
//       backroundImagePath='site-assets/folder_icon.png'
//       hidden={hidden} 
//       imagePaths={thumbnails} 
//       spacerImagePaths={spacerImagePaths} 
//       onClick={(imagePath: string, index: number) => setProjectIndex(index)}
//     />
//   }
  
//   return (<>
//     <Button onClick={() => setProjectIndex(-1)}>Back</Button>
//     {
//       projectList.map((project, index) => { return (
//         <ImageGrid 
//           key={index} 
//           hidden={hidden || projectIndex !== index} 
//           imagePadiths={project.files} 
//           spacerImagePaths={undefined}
//         />
//       )})
//     }
//   </>)
// }