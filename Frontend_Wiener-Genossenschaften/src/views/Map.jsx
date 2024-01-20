import * as React from 'react';
import Heading from '../components/Heading';
import { Box } from '@mui/material';
import LeafletMap from '../components/LeafletMap';

const MyMap = () => {
  return (
    // <Box
    //   sx={{
    //     my: 8,
    //     mx: 4,
    //   }}
    // >
    //   <Heading />
    //   <Box
    //     sx={{
    //       height: 100,
    //       width: 100,
    //     }}
    //   >
    <LeafletMap />
    //   </Box>
    // </Box>
  );
};

export default MyMap;
