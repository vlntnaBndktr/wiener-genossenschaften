import * as React from 'react';
import WatchList from '../components/WatchList';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Avatar from '@mui/material/Avatar';

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
        <Typography component="h1" variant="h4">
          Merkliste
        </Typography>

        <Typography
          variant="h7"
          align="center"
          color="text.secondary"
          paragraph
          mb={4}
        >
          Meine Neubauprojekte und freien Wohnungen.
        </Typography>
        <Stack direction="row" spacing={1} mb={4}>
          <Chip label="Sortieren" clickable variant="outlined" />

          <Chip label="Filter" clickable variant="outlined" />
          <Chip label="Suche" clickable variant="outlined" />
        </Stack>

        <WatchList />
      </Box>
    </>
  );
};

export default Favorites;
