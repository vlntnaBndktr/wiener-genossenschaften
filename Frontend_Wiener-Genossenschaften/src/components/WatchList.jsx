import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import useStore from '../stores/useStore';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import Avatar from '@mui/material/Avatar';
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';

export default function WhatchList() {
  // states und Funktionen aus dem useStore importieren
  const { favorites, getAllFavorites } = useStore();
  // laden der Projekte einmal beim Mounting
  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        // backgroundColor: 'inherit',
        boxShadow: 'none', // Setzt die Elevation auf 0 (kein Schatten)
        backgroundColor: (t) => t.palette.primary.light,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Angebot</TableCell>
            <TableCell align="right">Genossenschaft</TableCell>
            <TableCell align="right">Vormerkung</TableCell>
            <TableCell align="right">Ablaufdatum</TableCell>
            <TableCell align="right">Alarm</TableCell>
            <TableCell align="right">Notizen</TableCell>
            <TableCell align="right">Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((favorite) => (
            <TableRow
              key={favorite._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar
                  alt="Remy Sharp"
                  src={favorite.project.image}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {favorite.project.name}
              </TableCell>
              <TableCell align="right">
                {favorite.project.constructionAssociation}
              </TableCell>
              <TableCell align="right">
                {new Date(favorite.registrationDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                {favorite.registrationExpiryDate
                  ? new Date(
                      favorite.registrationExpiryDate
                    ).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell align="right">
                {favorite.alarm ? <AccessAlarmsRoundedIcon /> : ''}
              </TableCell>
              <TableCell align="right">
                {favorite.notes.map((note) => (
                  <div key={note._id}>{note.text}</div>
                ))}
              </TableCell>
              <TableCell align="right">
                <a
                  href={favorite.project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OpenInNewRoundedIcon />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
