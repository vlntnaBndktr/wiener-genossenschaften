import React from 'react';
import Grid from '@mui/material/Grid';

/*LayoutMain = eine Layout-Komponente, die meinen Content in zwei Teile teilt: links und rechts. 
Sie nimmt zwei Props entgegen (leftContent und rightContent), 
die dann mit spezifischem Inhalt befüllt werden können.*/

const LayoutMain = ({ leftContent, rightContent }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div style={{ border: '1px solid black', padding: '10px' }}>
          {/* Left Content: Logo, Name, Beschreibung, Navigation, Footer */}
          LINKES ITEM HALLO!!
          {leftContent}
        </div>
      </Grid>
      <Grid item xs={6}>
        <div style={{ border: '1px solid black', padding: '10px' }}>
          {/* Right Content: Login-Form || Signup-Form */}
          RECHTES ITEM HEY!!
          {rightContent}
        </div>
      </Grid>
    </Grid>
  );
};

export default LayoutMain;
