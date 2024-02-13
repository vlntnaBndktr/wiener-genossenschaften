import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStore from '../stores/useStore';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const ChangePassword = () => {
  // global-States aus dem useStore holen
  const { changePassword, errorMessage, password, success, error } = useStore(
    (state) => state
  );
  // local State für Warning
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (success) {
      setWarning(false);
    }
  }, [success === true]);

  // react-State erstellen mit useState-Hook
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChanges = (event) => {
    const { name, value } = event.target; //name + value kommen aus den Attributen des <input> Elements
    setFormData({
      ...formData, //Instanz des aktuellen State
      [name]: value,
    });
    // bei jeder Tastatur-Eigabe verändert sich das formData-Objekt
    // event.target: in diesem DOM-Element hat der Change stattgefunden
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    // console.log(password);
    if (formData.newPassword !== formData.confirmPassword) {
      console.log('Passwörter stimmen nicht überein');
      setWarning(true);
      // Warning setzen
      return;
    }
    changePassword(formData.oldPassword, formData.newPassword);
    setOpenSnackbar(true); // Snackbar anzeigen
    // console.log(formData);
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
      <Typography
        component="h1"
        variant="h4"
        mt={3}
        sx={{
          fontFamily: 'quicksand',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        Passwort ändern
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handlePasswordSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              name="oldPassword"
              label="Altes Passwort"
              type="password"
              id="oldPassword"
              autoComplete="password"
              value={formData.oldPassword}
              onChange={handleChanges}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              helperText={
                warning &&
                'Wählen Sie ein neues Passwort mit mindestens 8 Zeichen.'
              }
              name="newPassword"
              label="Neues Passwort"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={formData.newPassword}
              onChange={handleChanges}
              error={warning} //MUI-Prop
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              helperText={
                warning && 'Geben Sie das neue Passwort nocheinmal ein.'
              }
              name="confirmPassword"
              label="Neues Passwort bestätigen"
              type="password"
              id="confirmPassword"
              autoComplete="confirm-password"
              value={formData.confirmPassword}
              onChange={handleChanges}
              error={warning} //MUI-Prop
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Passwort ändern
        </Button>
      </Box>
    </>
  );
};
export default ChangePassword;
