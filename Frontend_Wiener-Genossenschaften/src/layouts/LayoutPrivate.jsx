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
import useStore from '../stores/useStore';

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
            // height: '100%',
          }}
        >
          {/* mini-menu */}
          <Grid item py={2} px={2} sx={{ display: { md: 'none' } }}>
            <Stack direction="row-reverse" spacing={2}>
              <Chip label="Logout" clickable variant="filled" />
              <Chip label="Signup" clickable variant="filled" />
            </Stack>
          </Grid>
          {/* mini-menu end */}

          {/* LOGO  */}
          <Grid item py={4} px={4}>
            <Box>
              <img
                src={'logo.png'}
                alt="Logo"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>
          {/* LOGO end */}
          <Grid item py={2} px={4}>
            <Typography
              variant="h5"
              align="left"
              color="text.secondary"
              paragraph
            >
              Alle aktuellen Wohnungsangebote und Planungsprojekte
              gemeinnütziger Bauvereinigungen in Wien. Auf einen Blick.
            </Typography>
          </Grid>

          <Grid
            item
            py={4}
            px={4}
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Footer />
          </Grid>
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
