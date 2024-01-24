import React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../styles/theme';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import PrivateStatic from '../views/PrivateStatic';
import Footer from '../components/Footer';

/*LayoutMain = eine Layout-Komponente, die meinen Content in zwei Teile teilt: links und rechts. 
Sie nimmt zwei Props entgegen (leftContent und rightContent), 
die dann mit spezifischem Inhalt befüllt werden können.*/

const LayoutPrivate = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ height: '100vh', border: '5px solid blue' }}>
        <CssBaseline />
        {/* Left Side: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={4}
          sx={{
            // backgroundImage: 'url(/cityscape-town-svgrepo-com.png)',
            // backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.secondary.main,
            overflow: 'hidden',
            border: '5px solid yellow',
            // backgroundSize: '80vh',
            // backgroundPosition: 'center 20%',
            // position: 'relative',
          }}
        >
          <Grid item border="10px solid white" py={4} px={4}>
            <PrivateStatic />
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
        {/* End*/}
        {/* Right Content */}

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={8}
          sx={{ backgroundColor: (t) => t.palette.primary.light }}
        >
          <ResponsiveAppBar />
          <Outlet />
        </Grid>
        {/* End*/}
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutPrivate;
