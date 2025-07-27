'use client'

import { DropdownPortfolioBanners } from '@/components/DropdownPortfolioBanners';
import MouseTrackingSeahorse from '../../components/MouseTrackingSeahorse';
import "../globals.css";

export default function Portfolio() {
	return (
		<>
			<DropdownPortfolioBanners/>
			<MouseTrackingSeahorse/>
		</>
	)
};
