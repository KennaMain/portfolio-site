import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { CustomThemeProvider } from "@/components/CustomThemeProvider";

export const metadata: Metadata = {
  title: "Kenna Main's Portfolio",
  description: "A site displaying all my favorite work!",
  icons: {
    icon: '/site-assets/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    // <html lang="en" className={erbaumFont.className}>
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            <ResponsiveAppBar pages={['About', 'Portfolio', 'Contact', 'About Me']} />
            {children}
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}