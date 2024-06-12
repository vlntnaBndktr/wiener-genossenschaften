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
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import Tooltip from '@mui/material/Tooltip';

const OneProject = () => {
  // projectId aus den URL-Parametern auslesen
  const { projectId } = useParams();
  // console.log('übergebene ID:', projectId);
  const { projects, getAllProjects } = useStore();
  // laden der Projekte einmal beim Mounting
  useEffect(() => {
    getAllProjects();
  }, []);

  // targetProject in Projects finden:
  const targetProject = projects.find((proj) => proj._id === projectId);
  // console.log('targetProject:', targetProject.name);

  console.log('targetProject:', targetProject);

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
          {targetProject.name}
        </Typography>
        <Typography variant="h7" align="center" color="text.secondary">
          {targetProject.location.street}{' '}
          <IconButton
            aria-label="show on map"
            sx={{ color: 'inherit' }}
            onClick={() => {
              navigate('/map');
            }}
          >
            <LocationOnIcon />
          </IconButton>
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
            onClick={() => openTargetProject(project._id)}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {targetProject.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              {targetProject.description}
            </Typography>
            <Typography fontWeight="bold">
              {targetProject.location.street}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              aria-label="show on map"
              sx={{ color: 'inherit' }}
              // onClick={() => handleMapClick(targetProject._id)}
            >
              <LocationOnIcon />
            </IconButton>
            <Button size="small">Zur Website</Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default OneProject;
