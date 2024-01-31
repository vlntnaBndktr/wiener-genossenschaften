import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useStore from '../stores/useStore';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const ChangeProfile = () => {
  // global-States aus dem useStore holen
  const { user, updateUser, success, error } = useStore();
  // react-State erstellen mit useState-Hook
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target; //name + value kommen aus den Attributen des <input> Elements
    setFormData({
      ...formData, //Instanz des aktuellen State
      [name]: value,
    });
    // bei jeder Tastatur-Eigabe verändert sich das formData-Objekt
    // event.target: in diesem DOM-Element hat der Change stattgefunden
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // updateUser-Funktion aus dem useStore aufrufen + aktuelle Werte übergeben
    console.log('button geklickt!');
    updateUser(
      formData.firstName,
      formData.lastName,
      formData.email
      // formData.oldPassword,
      // formData.newPassword
    );
    console.log(formData);
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
        <Typography component="h1" variant="h4">
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
                label="Vorname"
                value={formData.firstName}
                onChange={handleChange}
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
                label="Nachname"
                value={formData.lastName}
                onChange={handleChange}
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
                label="E-mail Adresse"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.oldPassword}
                onChange={handleChange}
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
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          {/* Conditional Rendering: Alerts */}
          {success && (
            <Alert severity="success">Profildaten erfolgreich geändert</Alert>
          )}
          {error && <Alert severity="error">Fehler</Alert>}
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
