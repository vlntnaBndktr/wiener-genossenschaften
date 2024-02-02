import React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../styles/theme';
import Footer from '../components/Footer';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LayoutPublic = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ height: '100vh', border: '5px solid blue' }}>
        <CssBaseline />
        {/* Left Side: */}
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          xs={12}
          sm={12}
          md={6}
          sx={{
            backgroundColor: (t) => t.palette.secondary.main,
            overflow: 'hidden',
            border: '5px solid yellow',
          }}
        >
          {/* mini-menu */}
          <Grid
            item
            border="10px solid white"
            py={2}
            px={2}
            sx={{ display: { md: 'none' } }}
          >
            <Stack direction="row-reverse" spacing={2}>
              <Chip label="Login" clickable variant="filled" />
              <Chip label="Signup" clickable variant="filled" />
            </Stack>
          </Grid>
          {/* mini-menu end */}

          {/* LOGO  */}
          <Grid item border="10px solid white" py={4} px={4}>
            <Box>
              <img
                src={'logo.png'}
                alt="Logo"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>
          {/* LOGO end */}
          <Grid item border="10px solid white" py={2} px={4}>
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
            border="10px solid green"
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
        {/* Right Side: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            backgroundColor: (t) => t.palette.primary.light,
          }}
        >
          <Outlet />
          <Grid
            item
            border="10px solid green"
            py={4}
            px={4}
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutPublic;
