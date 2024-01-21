// LogoAndName.jsx
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Logo() {
  return (
    <Box py={4}>
      <img
        src={'cityscape-town-svgrepo-com.png'}
        alt="Cityscape"
        style={{ height: '40vh', width: 'auto' }}
      />
    </Box>
  );
}
