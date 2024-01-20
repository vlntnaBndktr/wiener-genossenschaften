import * as React from 'react';
import WatchList from '../components/WatchList';
import Heading from '../components/Heading';
import FrameBox from '../components/frameBox';
import { Box } from '@mui/material';

const Favorites = () => {
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
      >
        <Heading />
        <WatchList />
      </Box>
    </>
  );
};

export default Favorites;
