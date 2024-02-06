import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useStore from '../stores/useStore';
import { useState } from 'react';

const ChangePassword = () => {
  // global-States aus dem useStore holen
  const { changePassword, errorMessage, password } = useStore();
  // local State für Warning
  const [warning, setWarning] = useState();
  // react-State erstellen mit useState-Hook
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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
    console.log(password);
    if (formData.newPassword !== formData.confirmPassword) {
      console.log('Passwörter stimmen nicht überein');

      return setWarning(true); // Beende die Funktion frühzeitig, wenn das Passwort nicht korrekt bestätigt wurde
    }
    changePassword(formData.oldPassword, formData.newPassword);
    console.log(formData);
  };

  return (
    <>
      <Typography component="h1" variant="h4" mt={3}>
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
        {/* Conditional Rendering: Alerts */}
        {warning && (
          <Grid
            item
            xs={12}
            sx={
              {
                // textAlign: 'center',
              }
            }
          >
            Passwörter stimmen nicht überein
          </Grid>
        )}
        {errorMessage && <p>{errorMessage}</p>}
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
