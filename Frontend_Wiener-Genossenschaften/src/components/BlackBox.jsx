import React from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../styles/theme';
import Footer from '../components/Footer';

const BlackBox = () => {
  return (
    <Box
      color={(t) => t.palette.primary.light}
      backgroundColor={(t) => t.palette.primary.dark}
    >
      <Footer />
    </Box>
  );
};

export default BlackBox;
