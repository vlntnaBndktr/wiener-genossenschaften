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
import PlaylistAddCircleRoundedIcon from '@mui/icons-material/PlaylistAddCircleRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddHomeIcon from '@mui/icons-material/AddHome';
import useStore from '../stores/useStore';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

// Empfängt 'project' als Prop von der Elternkomponente CurrentOffers
const ProjectCard = ({ project }) => {
  const { user, createFavorite, deleteFavorite } = useStore();
  // Kürze die Beschreibung auf maximal 250 Zeichen
  const shortDescription = project.description.substring(0, 250) + '...';

  const openExternalWebsite = () => {
    const externalLink = project.website;
    // Öffne den Link in einem neuen Tab
    window.open(externalLink, '_blank');
  };

  // Überprüfe, ob das aktuelle Projekt in den Favoriten des Benutzers enthalten ist
  const isFavorite = user.favorites.some(
    (favorite) => favorite.project === project._id
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      // Wenn es bereits ein Favorit ist, entferne es
      deleteFavorite(project._id);
      console.log(project._id);
    } else {
      // Wenn es kein Favorit ist, füge es hinzu
      createFavorite(project._id);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'inherit',
          boxShadow: 'none', // Setzt die Elevation auf 0 (kein Schatten)
          // backgroundColor: (t) => t.palette.primary.light,
        }}
      >
        {' '}
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor:
                  project.type === 'NP' ? 'secondary.main' : 'secondary.dark',
              }}
              aria-label="recipe"
            >
              {project.type}
            </Avatar>
          }
          title={project.constructionAssociation}
          subheader={project.moveIn}
        />
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image={project.image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {project.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>{shortDescription}</Typography>
          <Typography fontWeight="bold">{project.location.street}</Typography>
        </CardContent>
        <CardActions>
          <Avatar
            alt="Remy Sharp"
            src="/10.png"
            sx={{ width: 50, height: 50 }}
          />
          <Tooltip
            title={
              isFavorite
                ? 'Aus der Merkliste löschen'
                : 'Zur Merkliste hinzufügen'
            }
          >
            <IconButton
              aria-label={
                isFavorite ? 'remove from favorites' : 'add to favorites'
              }
              onClick={handleToggleFavorite}
              sx={{ color: isFavorite ? '#a280ff' : 'inherit' }}
            >
              <PlaylistAddCircleRoundedIcon />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="show on map" sx={{ color: 'black' }}>
            <LocationOnIcon />
          </IconButton>
          <Button size="small" onClick={openExternalWebsite}>
            Zur Website
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProjectCard;
