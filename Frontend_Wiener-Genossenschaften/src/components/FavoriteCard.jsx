import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useStore from '../stores/useStore';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

// Empfängt 'project' als Prop von der Elternkomponente CurrentOffers
const FavoriteCard = ({ targetFavorite }) => {
  const { user, createFavorite, deleteFavorite } = useStore();
  // Kürze die Beschreibung auf maximal 250 Zeichen
  const navigate = useNavigate();

  const openExternalWebsite = () => {
    const externalLink = targetFavorite.project.website;
    // Öffne den Link in einem neuen Tab
    window.open(externalLink, '_blank');
  };

  return (
    <>
      <Card
        sx={{
          height: '80%',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' }, // Bei kleinen Bildschirmen untereinander, bei größeren nebeneinander
          backgroundColor: 'inherit',
          boxShadow: 'none', // Setzt die Elevation auf 0 (kein Schatten)
          // backgroundColor: (t) => t.palette.primary.light,
        }}
      >
        {' '}
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
            minWidth: { xs: '100%', md: '50%' }, // Mindestbreite für Bild bei 50%
          }}
          image={targetFavorite.project.image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                Beschreibung
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                {targetFavorite.project.description}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FavoriteCard;
