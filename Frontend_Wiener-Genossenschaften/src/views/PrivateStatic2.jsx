import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../components/Logo';

const PrivateStatic2 = () => {
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Wiener Genossenschaften
        </Typography>
        <Typography
          variant="h7"
          align="center"
          color="text.secondary"
          paragraph
        >
          Alle aktuellen Wohnungsangebote auf einen Blick.
        </Typography>
      </Box>
      <Container maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Logo />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            HALLOOOOOOOOO Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Qui quos odit dolorem et culpa animi, libero totam enim quas,
            hic eos aliquam vitae odio quaerat alias? Culpa ipsa qui nisi.
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PrivateStatic2;