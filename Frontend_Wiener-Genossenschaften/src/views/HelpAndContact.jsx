import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStore from '../stores/useStore';
import { Link as RouterLink } from 'react-router-dom';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';

const HelpAndContact = () => {
  const { login, success, error, errorMessage, user } = useStore();
  // react-State erstellen mit useState-Hook

  const openExternalWebsite = () => {
    // Öffne den Link in einem neuen Tab
    window.open(
      'https://github.com/vlntnaBndktr/wiener-genossenschaften',
      '_blank'
    );
  };

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LiveHelpRoundedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Hilfe & Kontakt
        </Typography>

        <Typography mt={4} variant="h6" align="center" color="inherit">
          Valentina Benedikter
        </Typography>
        <Avatar
          src="10.png"
          sx={{ width: 70, height: 70, m: 2 }}
          variant="rounded"
        ></Avatar>
        <Typography variant="h6" align="center" color="inherit">
          benediktervalentina@gmx.at
        </Typography>
        <Link
          variant="h6"
          onClick={openExternalWebsite}
          sx={{ cursor: 'pointer' }}
        >
          Public GitHub Repository
        </Link>
        <Typography mt={4} variant="h7" color="inherit" align="center">
          {'Copyright © '}
          Valentina Benedikter
          {' | '}
          {new Date().getFullYear()}
          {' | '}Alle Rechte vorbehalten
          {'.'}
        </Typography>
      </Box>
    </>
  );
};

export default HelpAndContact;
