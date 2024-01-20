import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import SidebarLeft from '../components/SidebarLeft';
import Logo from '../components/Logo';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function PrivateStatic() {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="stretch"
    >
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: '10vh',
          textAlign: 'center',
          padding: '1rem',
          // border: '1px solid black',
          fontSize: 60,
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{ maxWidth: '100%', fontWeight: 'bold' }}
        >
          Wiener Genossenschaften
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: '30vh',
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: '40vh',
          textAlign: 'center',
          padding: '1rem',
          // border: '1px solid black',
          fontSize: 60,
        }}
      >
        <Logo />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          textAlign: 'bloc',
          padding: '1rem',
          // border: '1px solid black',
          fontSize: 20,
        }}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime unde
        consectetur officia odit commodi veritatis quibusdam a excepturi nemo
        expedita facere, minus quisquam praesentium obcaecati perferendis vitae
        eligendi cumque nisi!
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          textAlign: 'bloc',
          padding: '1rem',
          // border: '1px solid black',
          fontSize: 20,
        }}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime unde
        consectetur officia odit commodi veritatis quibusdam a excepturi nemo
        expedita facere, minus quisquam praesentium obcaecati perferendis vitae
        eligendi cumque nisi!
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          height: '5vh',
          textAlign: 'center',
          padding: '1rem',
          // border: '1px solid black',
          fontSize: 60,
        }}
      >
        {/* Footer */}
        <Box
          // sx={{ backgroundColor: (t) => t.palette.secondary.main, p: 6 }}
          component="footer"
        >
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </Grid>
    </Grid>
    // </Box>
  );
}
