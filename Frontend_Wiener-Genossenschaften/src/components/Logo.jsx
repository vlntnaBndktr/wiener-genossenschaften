// LogoAndName.jsx
import * as React from 'react';
import Box from '@mui/material/Box';

export default function Logo() {
  return (
    <Box
    // sx={{
    //   height: '60vh',
    //   textAlign: 'left',
    //   padding: '1rem',
    //   // border: '1px solid black',
    // }}
    >
      <img
        src={'cityscape-town-svgrepo-com.png'}
        alt="Cityscape"
        // style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  );
}
