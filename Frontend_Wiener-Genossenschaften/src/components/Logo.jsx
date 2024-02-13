import * as React from 'react';
import Box from '@mui/material/Box';

export default function Logo() {
  return (
    <Box>
      <img
        src={'LogoHaus.png'}
        alt="Logo"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  );
}
