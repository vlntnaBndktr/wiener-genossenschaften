// Sidebar.js
import * as React from 'react';
import Box from '@mui/material/Box';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../styles/theme';

export default function SidebarLeft() {
  return (
    <ThemeProvider theme={myTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 'auto',
          // maxWidth: 300,
          alignItems: 'flex-start',
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ borderRadius: 0, mt: 1, width: '100%' }}
          // disableElevation
        >
          {' '}
          <ApartmentIcon />
          Alle Angebote
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          // disableElevation
          sx={{ borderRadius: 0, mt: 1, width: '100%' }}
        >
          Merklist
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          // disableElevation
          sx={{ borderRadius: 0, mt: 1, width: '100%' }}
        >
          Kartenansicht
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          // disableElevation
          sx={{ borderRadius: 0, mt: 1, mb: 1, width: '100%' }}
        >
          Profil
        </Button>
      </Box>
    </ThemeProvider>
  );
}
