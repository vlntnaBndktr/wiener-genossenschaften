import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChangeProfile from '../components/ChangeProfile';
import ChangePassword from '../components/ChangePassword';

const ProfilDaten = () => {
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ChangeProfile />
      <ChangePassword />
    </Box>
  );
};

export default ProfilDaten;
