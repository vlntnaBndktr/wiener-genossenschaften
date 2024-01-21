import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

/* Login.jsx = eine spezifische Seite (Login-Seite) wird erstellt und in LayoutMain eingefügt. 
Die linke Seite kann für Dinge wie Logo, Namen, Navigation und Footer verwendet werden, 
die rechte Seite ist für das Login-Formular reserviert */

const Login = () => {
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
        <Typography component="h1" variant="h4">
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Angemeldet bleiben"
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
              <Link href="#" variant="body2">
                Passwort vergessen?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {'Sie haben noch kein Konto? Zur Registrierung'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
