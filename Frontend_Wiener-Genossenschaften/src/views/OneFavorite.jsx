import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'; // React Router Hook zum Auslesen von URL-Parametern
import useStore from '../stores/useStore';
import FavoriteCard from '../components/FavoriteCard';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const OneFavorite = () => {
  // favoriteId aus den URL-Parametern auslesen
  const { favoriteId } = useParams();
  // console.log('übergebene ID:', favoriteId);

  // Daten aus dem Store laden
  const { user } = useStore();
  // Favorite aus dem User mit passender ID finden
  console.log('User:', user);

  // Target Favorite im User Objekt finden:
  const targetFavorite = user.favorites.find((fav) => fav._id === favoriteId);
  console.log('targetFavorite:', targetFavorite);

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
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontFamily: 'quicksand', fontWeight: 600 }}
        >
          {targetFavorite.project.name}
        </Typography>
        <Typography variant="h7" align="center" color="text.secondary">
          {targetFavorite.project.location.street}{' '}
          <IconButton
            aria-label="show on map"
            sx={{ color: 'inherit' }}
            onClick={() => {
              navigate('/map');
            }}
          >
            <LocationOnIcon />
          </IconButton>
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor:
                    targetFavorite.project.type === 'NP'
                      ? 'special.light'
                      : 'special.dark',
                  color:
                    targetFavorite.project.type === 'NP'
                      ? 'special.dark'
                      : 'special.light',
                }}
                aria-label="type"
              >
                {targetFavorite.project.type}
              </Avatar>
            }
            title={targetFavorite.project.constructionAssociation}
            subheader={targetFavorite.project.moveIn}
          />
        </Typography>
        {targetFavorite.notes}
        <FavoriteCard targetFavorite={targetFavorite} />
      </Box>
    </>
  );
};

export default OneFavorite;
