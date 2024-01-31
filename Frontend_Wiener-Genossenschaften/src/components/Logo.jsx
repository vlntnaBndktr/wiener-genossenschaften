// LogoAndName.jsx
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Logo() {
  return (
    <Box>
      <img src={'logo.png'} alt="Logo" sx={{ maxWidth: '100%' }} />
    </Box>
  );
}
