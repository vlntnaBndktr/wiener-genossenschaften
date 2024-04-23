import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'; // React Router Hook zum Auslesen von URL-Parametern
import useStore from '../stores/useStore';

const OneFavorite = () => {
  // favoriteId aus den URL-Parametern auslesen
  const { id } = useParams();
  // Daten aus dem Store laden
  const { favorites } = useStore();

  // Favorite mit der passenden ID finden
  const favorite = favorites.find((fav) => fav._id === id);

  console.log('in OneFavorite:', favorites);
  console.log('übergebene ID:', id);
  return (
    <>
      <Typography component="h1" variant="h4">
        FAVORIT
      </Typography>
      {/* Hier kannst du den Inhalt des gefundenen Favoriten rendern */}
      {favorite._id}
    </>
  );
};

export default OneFavorite;
