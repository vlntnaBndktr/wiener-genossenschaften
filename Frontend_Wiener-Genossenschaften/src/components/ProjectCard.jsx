import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

// Empfängt 'project' als Prop von der Elternkomponente CurrentOffers
const ProjectCard = ({ project }) => {
  // Kürze die Beschreibung auf maximal 150 Zeichen
  const shortDescription = project.description.substring(0, 250) + '...';

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
            <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
              W
            </Avatar>
          }
          title={project.constructionAssociation}
          subheader="Fertigstellung 2025"
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="show on map">
            <LocationOnIcon />
          </IconButton>
          <Button size="small">Zur Website</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProjectCard;
