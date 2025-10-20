'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { theme } from '@/theme';
import MouseTrackingEye from './MouseTrackingEye';
import { CustomEvents } from '@/app/enums';

type Page = {
  title: string,
  href: string
}

interface Props {
  pages: Page[];
}

export class NavigationEvent extends Event {
  public href?: string
  constructor(type: string, eventInitDict?: EventInit) {
    super(type, eventInitDict)
  }
}

function ResponsiveAppBar(props: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (href: string) => {
    const navEvent = new NavigationEvent(CustomEvents.NAVBAR_NAVIGATION)
    navEvent.href = href
    document.dispatchEvent(navEvent)

    handleCloseNavMenu();
    router.push(href);
  };

  return (
    <AppBar sx={{bgcolor: theme.palette.background.paper, zIndex: 200}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>        
          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {props.pages.map((page) => (
                <MenuItem 
                  key={page.title} 
                  onClick={() => handleNavigation(page.href)}
                  sx={{ my: 2, display: 'block', fontSize: 24, color: theme.palette.secondary.light, textTransform: 'none' }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Box sx={{ position: "relative", display: { xs: 'flex', md: 'flex' }, mr: 1, mt: 5 }}>
            <img alt="My Logo!" src="./site-assets/navbar_logo.svg" height={'100px'}/>

            <MouseTrackingEye 
              src="site-assets/squid_eye.svg"
              alt="Squid Eye"
              bottom={7}
              left={15}
              zIndex={2001}
              width={21}
              height={21}
            />

            <MouseTrackingEye 
              src="site-assets/squid_eye.svg"
              alt="Squid Eye"
              bottom={7}
              left={65}
              zIndex={2001}
              width={21}
              height={21}
            />
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center", marginTop: 6 }}>
            {props.pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleNavigation(page.href)}
                sx={{ my: 2, display: 'block', fontSize: 24, color: theme.palette.secondary.light, textTransform: 'none' }}
                id={`navbar-${page.href}-button`}
                >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
