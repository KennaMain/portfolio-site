import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import './index.css';
import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ThemeProviderWrapper, ThemeContext } from './ThemeProviderWrapper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { AboutMe } from './pages/AboutMe';
import { Contact } from './pages/Contact';

const App: React.FC = () => {
	return (
		<ThemeProviderWrapper>
			<ThemeContext.Consumer>
				{({ toggleTheme, isDark }) => (
					<Box sx={{ position: 'relative' }}>
						{/* Theme toggle button */}
{/* 						<Tooltip title="Toggle light/dark theme">
							<IconButton
								onClick={toggleTheme}
								color="inherit"
								sx={{
									position: 'fixed',
									bottom: 16,
									right: 16,
									zIndex: 9999,
								}}
							>
								{isDark ? <Brightness7Icon /> : <Brightness4Icon />}
							</IconButton>
						</Tooltip> */}

						{/* Main Page Content */}
						<CssBaseline />
						<Router>
							<ResponsiveAppBar pages={['About', 'Portfolio', 'Contact']} />
							<Routes>
								<Route path="/contact" element={<Contact />} />
								<Route path="/about-me" element={<AboutMe />} />
								<Route path="/about" element={<About />} />
								<Route path="/portfolio" element={<Portfolio />} />
								<Route path="/" element={<Portfolio />} />
							</Routes>
						</Router>
						{/* End main content */}

					</Box>
				)}
			</ThemeContext.Consumer>
		</ThemeProviderWrapper>
	);
};

export default App;
