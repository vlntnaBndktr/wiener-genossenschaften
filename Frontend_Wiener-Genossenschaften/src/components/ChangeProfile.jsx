import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useStore from '../stores/useStore';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const ChangeProfile = () => {
  // global-States aus dem useStore holen
  const { user, updateUser, success, error, errorMessage } = useStore();
  // react-State erstellen mit useState-Hook
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    updateUser(formData.firstName, formData.lastName, formData.email);
    setOpenSnackbar(true); // Snackbar anzeigen
    console.log(formData);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Snackbar schließen
  };

  return (
    <>
      {/* Snackbar für Fehlermeldung und Erfolgsmeldung */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error ? errorMessage : 'Profildaten erfolgreich geändert'}
        </Alert>
      </Snackbar>
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
    </>
  );
};
export default ChangeProfile;
