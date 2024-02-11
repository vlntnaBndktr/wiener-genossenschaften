import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const InfoSnackbar = ({
  open,
  onClose,
  error,
  errorMessage,
  successMessage,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={error ? 'error' : 'success'}
        sx={{ width: '100%' }}
      >
        {error ? errorMessage : successMessage}
      </Alert>
    </Snackbar>
  );
};

export default InfoSnackbar;
