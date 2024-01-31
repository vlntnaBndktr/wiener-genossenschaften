import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../components/Logo';
import { Box } from '@mui/material';
import useStore from '../stores/useStore';

const PrivateStatic = () => {
  const { user } = useStore();
  return (
    <>
      <Box
        pt={4}
        px={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography
          align="left"
          fontWeight={'bold'}
          color={(t) => t.palette.primary.light}
          fontSize={60}
        >
          {user.firstName + 's' + 'WG'}
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
