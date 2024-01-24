import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../components/Logo';
import { Box } from '@mui/material';

const PrivateStatic = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography
          align="left"
          fontWeight={'bold'}
          color={(t) => t.palette.primary.light}
          fontSize={120}
        >
          WG
        </Typography>
        <Typography variant="h3" align="left">
          Wiener Genossenschaften
        </Typography>
        <Typography variant="h7" align="left" color="text.secondary" paragraph>
          Alle aktuellen Wohnungsangebote auf einen Blick.
        </Typography>

        <Logo />
      </Box>
    </>
  );
};

export default PrivateStatic;
