'use client'

import { DropdownPortfolioBanners } from '@/components/DropdownPortfolioBanners';
import CenteredButtons from '../../components/CenteredButtons';
import MouseTrackingSeahorse from '../../components/MouseTrackingSeahorse';
import "../globals.css";

export default function Portfolio() {
	return (
		<>
			<DropdownPortfolioBanners/>
			{/* <CenteredButtons/> */}
			<MouseTrackingSeahorse/>
		</>
	)
};
