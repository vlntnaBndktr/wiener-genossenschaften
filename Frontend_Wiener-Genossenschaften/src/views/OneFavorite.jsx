import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'; // React Router Hook zum Auslesen von URL-Parametern
import useStore from '../stores/useStore';
import FavoriteCard from '../components/FavoriteCard';

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
      <Typography component="h1" variant="h4">
        FAVORIT
      </Typography>
      <Typography>{targetFavorite.project.name}</Typography>
      <Typography>{targetFavorite.alarm}</Typography>
      <Typography>{targetFavorite.registrationDate}</Typography>
      <Typography>{targetFavorite.registrationExpiryDate}</Typography>
      <ul>
        {targetFavorite.notes.map((note) => (
          <li key={note._id}>{note.text}</li>
        ))}
      </ul>
      <FavoriteCard targetFavorite={targetFavorite} />
    </>
  );
};

export default OneFavorite;
