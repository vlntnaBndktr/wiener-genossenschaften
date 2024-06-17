import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import useStore from '../stores/useStore';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveIcon from '@mui/icons-material/Save';
import Avatar from '@mui/material/Avatar';
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ConfirmationModal from '../views/ConfirmationModal';
import { IconButton } from '@mui/material';

//TODO: Alarm - API anpassen oder Datum schicken

export default function WhatchList() {
  // states und Funktionen aus dem useStore importieren
  const {
    favorites,
    getAllFavorites,
    updateFavorite,
    deleteFavorite,
    getAllProjects,
    user,
  } = useStore();
  // states für editing:
  const [editMode, setEditMode] = useState(false);
  const [targetItem, setTargetItem] = useState(null);
  const [editedValues, setEditedValues] = useState({
    registrationDate: '',
    registrationExpiryDate: '',
    alarm: false,
    notes: '',
  }); // Die Struktur von editedValues beim Bearbeiten eines Favoriten initialisieren
  const [openModal, setOpenModal] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  useEffect(() => {
    getAllFavorites();
  }, []); // laden der Projekte einmal beim Mounting

  useEffect(() => {
    getAllProjects();
  }, []);

  const navigate = useNavigate();

  const openTargetProject = (projectId) => {
    // zur Route '/oneFavorite' navigieren und Favoriten-ID als Parameter übergeben
    navigate(`/project/${projectId}`);
  };

  const handleEdit = (favorite) => {
    setEditMode(true);
    setTargetItem(favorite);
    console.log('favorite im handleEdit:', favorite);
    // Initialwerte für die Zellen die bearbeitet werden
    setEditedValues({
      registrationDate: favorite.registrationDate,
      registrationExpiryDate: favorite.registrationExpiryDate,
      alarm: favorite.alarm || false,
      notes: favorite.notes || '',
    });
  };

  console.log('editedValues:', editedValues);
  console.log('user:', user);

  const handleChange = (key, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log('editedValues im handleSave:', editedValues);
    console.log('targetItem:', targetItem);
    // Logik zum Speichern in DB mit updateFavorite
    updateFavorite(targetItem._id, editedValues);
    // alles zurücksetzten
    setEditMode(false);
    setTargetItem(null);
    setEditedValues({
      registrationDate: '',
      registrationExpiryDate: '',
      alarm: false,
      notes: '',
    });
  };

  const handleOpenModal = (favorite) => {
    console.log('dieser Favorite soll gelöscht werden: ', favorite.project._id);
    // deleteFavorite(favorite.project._id);
    setSelectedFavorite(favorite);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFavorite(null);
  };

  const handleDelete = () => {
    if (selectedFavorite) {
      deleteFavorite(selectedFavorite.project._id);
      handleCloseModal();
    }
  };

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
            <TableCell>Genossenschaft</TableCell>
            <TableCell align="right">Vormerkung</TableCell>
            <TableCell align="right">Ablaufdatum</TableCell>
            <TableCell align="right">Alarm</TableCell>
            <TableCell align="right">Notizen</TableCell>
            <TableCell align="right">Website</TableCell>
            <TableCell align="right">Löschen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((favorite) => (
            <TableRow
              key={favorite._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Tooltip title={'Details'} arrow>
                  <Avatar
                    alt="Remy Sharp"
                    src={favorite.project.image}
                    sx={{ width: 56, height: 56 }}
                    onClick={() => openTargetProject(favorite.project._id)}
                    // diesen Favorite in der Komponente OneFavorite anzeigen (route: '/oneFavorite')
                  />
                </Tooltip>
              </TableCell>
              <TableCell component="th" scope="row">
                {favorite.project.name}
              </TableCell>
              <TableCell>{favorite.project.constructionAssociation}</TableCell>
              <TableCell align="right">
                {editMode && targetItem?._id === favorite._id ? (
                  <input
                    type="date"
                    value={
                      new Date(editedValues.registrationDate)
                        .toISOString()
                        .split('T')[0]
                    }
                    onChange={(e) =>
                      handleChange('registrationDate', e.target.value)
                    }
                  />
                ) : (
                  new Date(favorite.registrationDate).toLocaleDateString()
                )}
              </TableCell>
              <TableCell align="right">
                {editMode && targetItem?._id === favorite._id ? (
                  <input
                    type="date"
                    value={
                      new Date(editedValues.registrationExpiryDate)
                        .toISOString()
                        .split('T')[0]
                    }
                    onChange={(e) =>
                      handleChange('registrationExpiryDate', e.target.value)
                    }
                  />
                ) : favorite.registrationExpiryDate ? (
                  new Date(favorite.registrationExpiryDate).toLocaleDateString()
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell align="right">
                {editMode && targetItem?._id === favorite._id ? (
                  <input
                    type="checkbox"
                    checked={editedValues.alarm}
                    onChange={(e) => handleChange('alarm', e.target.checked)}
                  />
                ) : favorite.alarm ? (
                  <AccessAlarmsRoundedIcon />
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell align="right">
                {editMode && targetItem?._id === favorite._id ? (
                  <textarea
                    id="notes"
                    value={editedValues.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                  />
                ) : (
                  favorite.notes
                )}
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
              {/* EDIT: */}
              <TableCell align="right">
                <IconButton>
                  {!editMode ? (
                    <EditRoundedIcon onClick={() => handleEdit(favorite)} />
                  ) : (
                    <SaveIcon color="info" onClick={handleSave} />
                  )}
                </IconButton>
                <IconButton onClick={() => handleOpenModal(favorite)}>
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal Komponente außerhalb der Schleife: wenn ein Favorit selektiert ist dann Modalfenster öffnen */}
      {selectedFavorite && (
        <ConfirmationModal
          open={openModal}
          onClose={handleCloseModal}
          onConfirm={handleDelete}
          title="Sind Sie sicher?"
          description="Wenn Sie den Favoriten aus der Merkliste entfernen, werden alle Notizen und persönlichen Einträge dazu gelöscht."
        />
      )}
    </TableContainer>
  );
}
