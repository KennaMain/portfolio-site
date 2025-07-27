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

interface Props {
  pages: string[];
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

  const handleNavigation = (page: string) => {
    handleCloseNavMenu();
    router.push(`/${page.toLowerCase().replace(" ", "-")}`);
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
                  key={page} 
                  onClick={() => handleNavigation(page)}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo */}
          <Box sx={{ position: "relative", display: { xs: 'none', md: 'flex' }, mr: 1, mt: 5 }}>
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
            {props.pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}  // Fixed: Added navigation
                sx={{ my: 2, display: 'block', fontSize: 24, color: theme.palette.secondary.light, textTransform: 'none' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
