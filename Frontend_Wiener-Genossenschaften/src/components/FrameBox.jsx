import * as React from 'react';
import { Box } from '@mui/material';

const FrameBox = () => {
  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      ></Box>
    </>
  );
};

export default FrameBox;
