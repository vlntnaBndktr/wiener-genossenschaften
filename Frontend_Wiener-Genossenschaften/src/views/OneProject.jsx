import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'; // React Router Hook zum Auslesen von URL-Parametern
import useStore from '../stores/useStore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PlaylistAddCircleRoundedIcon from '@mui/icons-material/PlaylistAddCircleRounded';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const OneProject = () => {
  // projectId aus den URL-Parametern auslesen
  const { projectId } = useParams();
  console.log('übergebene ID:', projectId);

  const { projects, user, createFavorite, deleteFavorite } = useStore();

  console.log('projects:', projects);
  // targetProject in Projects finden:
  const targetProject = projects.find((proj) => proj._id === projectId);

  const isFavorite = user.favorites.some(
    (favorite) => favorite.project._id === targetProject._id
  );
  const handleToggleFavorite = () => {
    if (isFavorite) {
      // Wenn es bereits ein Favorit ist, entferne es
      deleteFavorite(targetProject._id);
    } else {
      // Wenn es kein Favorit ist, füge es hinzu
      createFavorite(targetProject._id);
    }
  };

  const navigate = useNavigate();
  const handleMapClick = (projectId) => {
    // zur Route '/oneFavorite' navigieren und Favoriten-ID als Parameter übergeben
    navigate(`/targetMap/${projectId}`);
  };

  const openExternalWebsite = () => {
    const externalLink = targetProject.website;
    // Öffne den Link in einem neuen Tab
    window.open(externalLink, '_blank');
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
        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ fontFamily: 'quicksand', fontWeight: 600 }}
        >
          {targetProject.name}
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          fontWeight="bold"
        >
          {targetProject.location.street}{' '}
          <Tooltip title="Auf der Karte anzeigen">
            <IconButton
              aria-label="show on map"
              sx={{ color: 'primary.dark' }}
              onClick={() => handleMapClick(targetProject._id)}
            >
              <LocationOnIcon />
            </IconButton>
          </Tooltip>
        </Typography>

        {/* {targetProject.notes} */}
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
                    targetProject.type === 'NP'
                      ? 'special.light'
                      : 'special.dark',
                  color:
                    targetProject.type === 'NP'
                      ? 'special.dark'
                      : 'special.light',
                }}
                aria-label="recipe"
              >
                {targetProject.type}
              </Avatar>
            }
            title={targetProject.constructionAssociation}
            subheader={targetProject.moveIn}
          />
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: '56.25%',
            }}
            image={targetProject.image}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {targetProject.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              {targetProject.description}
            </Typography>
          </CardContent>
          <CardActions>
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
                sx={{ color: isFavorite ? 'secondary.main' : 'inherit' }}
              >
                <PlaylistAddCircleRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={`Direkt zur Website der ${targetProject.constructionAssociation}`}
            >
              <Button
                size="medium"
                variant="text"
                disableElevation
                sx={{
                  color: 'special.dark',
                }}
                onClick={openExternalWebsite}
              >
                <OpenInNewIcon
                  sx={{
                    marginRight: 1,
                  }}
                />
                Zur Genossenschaft
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default OneProject;
