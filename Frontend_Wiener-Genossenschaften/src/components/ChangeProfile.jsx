import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

const ChangeProfile = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profildaten
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                // label="First Name"
                autoFocus
                value="Valentina"
                label="Vorname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                // label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value="Benedikter"
                label="Nachname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                // label="Email Address"
                name="email"
                autoComplete="email"
                value="valentina.benedikter@gmx.at"
                label="E-mail Adresse"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="oldPassword"
                label="Altes Passwort"
                type="password"
                id="oldPassword"
                autoComplete="password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                helperText="Hier können Sie Ihr Passwort ändern."
                name="newPassword"
                label="Neues Passwort"
                type="password"
                id="newPassword"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Speichern
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default ChangeProfile;
