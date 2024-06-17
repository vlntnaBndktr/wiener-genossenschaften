import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      sx={{
        textAlign: 'center', // Zentrierung des Inhalts
      }}
    >
      <HighlightOffRoundedIcon
        fontSize="large"
        sx={{
          fontSize: '6rem',
          color: 'secondary.main',
          margin: 'auto',
          mt: '8',
          paddingTop: 2,
        }}
      />
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 4 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ bgcolor: 'primary.main' }}
          autoFocus
        >
          Abbrechen
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{ bgcolor: 'secondary.main' }}
        >
          Löschen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
