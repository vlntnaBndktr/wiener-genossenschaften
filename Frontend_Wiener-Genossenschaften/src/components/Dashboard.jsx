import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  return (
    <Box sx={{ m: 2, height: 128 }}>
      <Paper elevation={0}>
        {' '}
        <Typography variant="h5" gutterBottom>
          Hier kommt noch was sinnvolles rein
        </Typography>
      </Paper>
    </Box>
  );
}
