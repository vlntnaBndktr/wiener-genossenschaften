// Sidebar.js
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Button from '@mui/material/Button';

export default function Sidebar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        maxWidth: 300,
      }}
    >
      <Button
        variant="contained"
        color="error"
        size="large"
        disableElevation
        disabled
      >
        Merkliste
      </Button>
      <Button variant="contained" color="error" size="large" disableElevation>
        Alle Angebote
      </Button>
      <Button variant="contained" color="error" size="large" disableElevation>
        Kartenansicht
      </Button>
      <Button variant="contained" color="error" size="large" disableElevation>
        Profil
      </Button>
    </Box>
  );
}
