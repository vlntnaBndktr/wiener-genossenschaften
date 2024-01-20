import React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import PublicStatic from '../views/PublicStatic';
import myTheme from '../styles/theme';

/*LayoutMain = eine Layout-Komponente, die meinen Content in zwei Teile teilt: links und rechts. 
Sie nimmt zwei Props entgegen (leftContent und rightContent), 
die dann mit spezifischem Inhalt befüllt werden können.*/

const LayoutPublic = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* Left Side Content with Background: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.secondary.main,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Set position to relative
            overflow: 'hidden', // Hide overflow to prevent image from going beyond the container
          }}
        >
          <PublicStatic />
        </Grid>
        {/* Right Side: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={0}
          square
          sx={{
            backgroundRepeat: 'no-repeat',
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
