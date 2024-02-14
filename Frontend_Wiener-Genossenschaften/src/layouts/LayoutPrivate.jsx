import React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../styles/theme';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Footer from '../components/Footer';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from '../components/Logo';

const LayoutPrivate = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <CssBaseline />
        {/* Left Side: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={2}
          sx={{
            backgroundColor: (t) => t.palette.secondary.main,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* mini-menu */}
          {/* <Grid item py={2} px={2} sx={{ display: { md: 'none' } }}>
            <Stack direction="row-reverse" spacing={2}>
              <Chip label="Logout" clickable variant="filled" />
              <Chip label="Signup" clickable variant="filled" />
            </Stack>
          </Grid> */}
          {/* mini-menu end */}

          {/* LOGO  */}
          <Grid item py={4} px={4}>
            <Logo />
          </Grid>
          {/* LOGO end */}
          <Grid item py={2} px={4}>
            <Typography
              variant="h5"
              align="left"
              color={(t) => t.palette.primary.dark}
              paragraph
            >
              Alle aktuellen Wohnungsangebote und Planungsprojekte
              gemeinnütziger Bauvereinigungen in Wien.
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              color={(t) => t.palette.primary.dark}
              paragraph
              sx={{
                fontFamily: 'quicksand',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Auf einen Blick.</span>
            </Typography>
          </Grid>
          {/* Footer */}
          <Grid
            item
            py={8}
            px={4}
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Footer />
          </Grid>
          {/* Footer Ende */}
          <Grid
            item
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
              display: { lg: 'none', xl: 'block' },
              flexGrow: 1, // Take up remaining space
            }}
          ></Grid>
        </Grid>
        {/* End*/}
        {/* Right Content */}

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={10}
          sx={{ backgroundColor: (t) => t.palette.primary.light }}
          pt={2}
        >
          <ResponsiveAppBar />
          <Outlet />
          {/* Footer bei xs */}
          <Grid
            item
            py={4}
            px={4}
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Footer />
          </Grid>
          {/* Footer End */}
        </Grid>
        {/* End*/}
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutPrivate;
