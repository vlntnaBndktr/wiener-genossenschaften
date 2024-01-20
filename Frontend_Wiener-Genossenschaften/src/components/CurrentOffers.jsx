import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CurrentOffers = () => {
  return (
    <>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Alle Angebote
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
        <Container maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={6} lg={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'none', // Setzt die Elevation auf 0 (kein Schatten)
                  }}
                >
                  {' '}
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: 'secondary.main' }}
                        aria-label="recipe"
                      >
                        W
                      </Avatar>
                    }
                    title="WBV-GPA"
                    subheader="Fertigstellung 2025"
                  />
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://www.wbv-gpa.at/app/uploads/2022/10/A4680_01_crop_RGB_WWW.jpg"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      sophie 7: Eine Stadtoase mitten in 1070 Wien
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Am Areal des ehemaligen Sophienspitals entsteht bis 2025
                      ein neues urbanes Quartier mit einem attraktiven Mix aus
                      Wohnen, Arbeiten, Bildung, Kultur und Freizeit. Ein
                      öffentlicher Park und eine Stadtterrasse werden allen
                      Wiener:innen offen stehen.
                    </Typography>
                    <Typography fontWeight="bold">
                      1070 Wien, Apollogasse 19
                    </Typography>
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
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default CurrentOffers;
