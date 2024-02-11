import * as React from 'react';
import Typography from '@mui/material/Typography';
import useStore from '../stores/useStore';

const OneFavorite = () => {
  const { favorite } = props; // Favoriten aus den Props
  const { favorites, getAllFavorites } = useStore();
  console.log('in OneFavorite:', favorite);
  return (
    <>
      <Typography component="h1" variant="h4">
        FAVORIT
      </Typography>
    </>
  );
};
export default OneFavorite;
