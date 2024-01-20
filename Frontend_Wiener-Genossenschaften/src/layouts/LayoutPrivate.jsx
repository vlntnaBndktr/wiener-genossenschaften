import React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import PrivateStatic from '../views/PrivateStatic';
import myTheme from '../styles/theme';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import PrivateStatic2 from '../views/PrivateStatic2';

/*LayoutMain = eine Layout-Komponente, die meinen Content in zwei Teile teilt: links und rechts. 
Sie nimmt zwei Props entgegen (leftContent und rightContent), 
die dann mit spezifischem Inhalt befüllt werden können.*/

const LayoutPrivate = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* Left Content: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            // backgroundImage: 'url(/cityscape-town-svgrepo-com.png)',
            // backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.secondary.main,
            // backgroundSize: '80vh',
            // backgroundPosition: 'center 20%',
            // position: 'relative',
            // overflow: 'hidden',
          }}
        >
          <PrivateStatic2 />
        </Grid>
        {/* End*/}
        {/* Right Content */}

        <Grid
          item
          xs={12}
          sm={12}
          md={8}
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
