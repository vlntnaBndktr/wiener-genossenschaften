import * as React from 'react';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="inherit" align="left">
      {'Copyright © '}
      <Link href="https://mui.com/">Valentina Benedikter</Link>
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
      <Box
        sx={{ color: (t) => t.palette.primary.main }}
        component="footer"
        // py={4}
      >
        <Typography variant="h6" align="left">
          WIENER GENOSSENSCHAFTEN
        </Typography>
        <Typography variant="subtitle1" align="left" component="p">
          benediktervalentina@gmx.at
        </Typography>
        <Copyright />
      </Box>
    </>
  );
};

export default Footer;
