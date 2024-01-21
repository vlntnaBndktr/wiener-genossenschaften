import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import PublicStatic from '../views/PublicStatic';
import myTheme from '../styles/theme';
import Footer from '../components/Footer';
import { Box } from '@mui/material';
import BlackBox from '../components/BlackBox';

/*Layoutainer';Main = eine Layout-Komponente, die meinen Content in zwei Teile teilt: links und rechts. 
Sie nimmt zwei Props entgegen (leftContent und rightContent), 
die dann mit spezifischem Inhalt befüllt werden können.*/

const LayoutPublic = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ height: '100vh', border: '5px solid blue' }}>
        <CssBaseline />
        {/* Left Side: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            // height: '100vh',
            backgroundColor: (t) => t.palette.secondary.main,
            overflow: 'hidden',
            border: '5px solid yellow',
          }}
        >
          <Grid item border="10px solid white" py={4} px={4}>
            <PublicStatic />
          </Grid>

          <Grid
            item
            border="10px solid green"
            py={4}
            px={4}
            sx={{
              // height: '100vh',
              backgroundColor: (t) => t.palette.primary.dark,
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutPublic;
