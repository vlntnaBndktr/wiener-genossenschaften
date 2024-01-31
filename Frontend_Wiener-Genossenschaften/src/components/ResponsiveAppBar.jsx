import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import AddHomeWorkRoundedIcon from '@mui/icons-material/AddHomeWorkRounded';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../styles/theme';

import { useNavigate } from 'react-router-dom';

import useStore from '../stores/useStore';

function ResponsiveAppBar() {
  const { user } = useStore();

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const test = () => {
    console.log('TEST!!!!!!!!!!!!');
  };

  return (
    <ThemeProvider theme={myTheme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: (t) => t.palette.primary.light,
          color: (t) => t.palette.secondary.main,
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="xl" sx={{ color: (t) => t.palette.primary.dark }}>
          <Toolbar disableGutters>
            {/* Large-ICON+TYPO: Wird erst ab md-Bilschirmgröße angezeigt: */}
            <AddHomeWorkRoundedIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: (t) => t.palette.secondary.dark,
                textDecoration: 'none',
                // cursor: 'pointer',
              }}
            >
              meine WG
            </Typography>
            {/* Ende Large-ICON+TYPO*/}

            {/* Small-MENU: Wird nur bei xs + sm Bilschirmgröße angezeigt: */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
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
                <MenuItem
                  onClick={() => {
                    navigate('/user');
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Alle Angebote</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/favorites');
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Merkliste</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/map');
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Kartenansicht</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AddHomeWorkRoundedIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              meine WG
            </Typography>
            {/* Small-MENU Ende */}

            {/* Large-MENU: Wird erst ab md-Bilschirmgröße angezeigt: */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => {
                  navigate('/user');
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: (t) => t.palette.secondary.dark,
                  display: 'block',
                }}
              >
                Alle Angebote
              </Button>
              <Button
                onClick={() => {
                  navigate('/favorites');
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: (t) => t.palette.secondary.dark,
                  display: 'block',
                }}
              >
                Merkliste
              </Button>
              <Button
                onClick={() => {
                  navigate('/map');
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: (t) => t.palette.secondary.dark,
                  display: 'block',
                }}
              >
                Kartenansicht
              </Button>
            </Box>
            {/* Large-MENU Ende */}
            {/* User-Menu*/}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate('/profile');
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Profil</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Hilfe & Kontakt</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    // logout();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
