import * as React from 'react';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

function Copyright() {
  return (
    <Typography variant="body2" color="inherit" align="left">
      {'Copyright © '}
      <Link href="https://github.com/vlntnaBndktr/wiener-genossenschaften">
        Valentina Benedikter
      </Link>
      {' | '}
      {new Date().getFullYear()}
      {' | '}Alle Rechte vorbehalten
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <Grid item sx={{ color: (t) => t.palette.primary.main }}>
        <Typography
          variant="h5"
          align="left"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          WIENER GENOSSENSCHAFTEN
        </Typography>
        <Typography variant="subtitle1" align="left" component="p">
          benediktervalentina@gmx.at
        </Typography>
        <Copyright />
      </Grid>
    </>
  );
};

export default Footer;
