import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeChanger } from "@/components/ThemeChanger";

export const metadata: Metadata = {
  title: "Kenna Main's Portfolio",
  description: "A site displaying all my favorite work!",
  icons: {
    icon: '/site-assets/favicon.svg',
  }, 
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    // <html lang="en" className={erbaumFont.className}>
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <ThemeChanger/>
            {/* <ResponsiveAppBar pages={pages}/> */}
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}