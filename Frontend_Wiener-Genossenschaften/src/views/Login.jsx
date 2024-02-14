import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Typography from '@mui/material/Typography';
import useStore from '../stores/useStore';

import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Login = () => {
  const { login, success, error, errorMessage, user } = useStore();
  // react-State erstellen mit useState-Hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    // login-Funktion aus dem useStore aufrufen + aktuelle Werte übergeben
    login(formData.email, formData.password);
    // setOpenSnackbar(true); // Snackbar anzeigen
    console.log('formData:', formData);
    console.log('errorMessage:', errorMessage);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Snackbar schließen
  };

  useEffect(() => {
    // Wenn ein Fehler auftritt oder der Login erfolgreich ist, die Snackbar anzeigen
    if (error !== null) {
      setOpenSnackbar(true);
    }
  }, [error]);

  return (
    <>
      {/* Snackbar für Fehlermeldung*/}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
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
          <KeyRoundedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail Adresse"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Passwort"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              {/* TODO <Link href="#" variant="body2">
                Passwort vergessen?
              </Link> */}
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {'Sie haben noch kein Konto? Registrierung'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
