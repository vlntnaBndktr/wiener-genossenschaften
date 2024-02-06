import * as React from 'react';
import { useEffect } from 'react';
import useStore from '../stores/useStore';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import ProjectCard from './ProjectCard';

const CurrentOffers = () => {
  // states und Funktionen aus dem useStore importieren
  const { projects, loading, error, getAllProjects } = useStore();
  // laden der Projekte einmal beim Mounting
  useEffect(() => {
    getAllProjects();
  }, []);

  // Rückmeldungen an den User:
  if (loading) {
    return <p>Lade...</p>;
  }
  if (error) {
    return <p>Fehler beim Laden der Projekte: {error.message}</p>;
  }

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
          ALLE ANGEBOTE
        </Typography>
        <Typography
          variant="h7"
          align="center"
          color="text.secondary"
          paragraph
        >
          Alle aktuellen Wohnungsangebote auf einen Blick.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="outlined">Neubauprojekte</Button>
          <Button variant="outlined">Freie Wohnungen</Button>
        </Stack>
      </Box>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Array mit allen projects durchlaufen: 
          Für jedes Element wird ein Grid-Item erstellt.
          Die key-Prop = project.id */}
          {projects.map((project) => (
            <Grid item key={project._id} xs={12} sm={6} md={4} lg={4} xl={3}>
              {/* Die Projektdaten werden der ProjectCard-Komponente als project-Prop übergeben. */}
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CurrentOffers;
