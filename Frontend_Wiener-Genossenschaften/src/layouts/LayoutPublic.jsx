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
import Logo from '../components/Logo';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const LayoutPublic = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <CssBaseline />
        {/* Left Side: */}
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="left"
          xs={12}
          sm={12}
          md={6}
          sx={{
            backgroundColor: (t) => t.palette.secondary.main,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* mini-menu */}
          {/* <Grid
            item
            py={2}
            px={2}
            sx={{
              display: { md: 'none' },
            }}
          >
            <Stack direction="column" spacing={2}>
              <Chip
                // avatar={<Avatar src="faviconBlack.ico" />}
                label="Login"
                sx={{
                  color: 'black',
                  backgroundColor: (t) => t.palette.secondary.light,
                }}
                onClick={() => {
                  navigate('/login');
                }}
              />
              <Chip
                label="Signup"
                sx={{
                  color: 'black',
                  backgroundColor: (t) => t.palette.secondary.light,
                }}
                onClick={() => {
                  navigate('/signup');
                }}
              />
            </Stack>
          </Grid> */}
          {/* mini-menu end */}

          {/* LOGO  */}
          <Grid item py={4} px={10}>
            <Logo />
          </Grid>
          {/* LOGO end */}
          {/* SCHRIFT */}
          <Grid
            item
            py={2}
            px={4}
            sx={{
              display: { xs: 'block', lg: 'none' },
            }}
          >
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

          <Grid
            item
            py={2}
            px={10}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            <Typography
              variant="h4"
              align="left"
              color={(t) => t.palette.primary.dark}
              paragraph
            >
              Alle aktuellen Wohnungsangebote und Planungsprojekte
              gemeinnütziger Bauvereinigungen in Wien.
            </Typography>
            <Typography
              component="h1"
              variant="h4"
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
          {/* SCHRIFT Ende */}
          <Grid
            item
            py={8}
            px={4}
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
              display: { xs: 'none', md: 'block' },
              marginTop: 'auto', // Push the footer to the bottom
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
          pt={2}
        >
          <Outlet />
          {/* Footer bei xs */}
          <Grid
            item
            py={8}
            px={4}
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Footer />
          </Grid>
          {/* Footer Ende */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutPublic;
