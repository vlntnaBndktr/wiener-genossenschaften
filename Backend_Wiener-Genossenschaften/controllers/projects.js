import { validationResult, matchedData, body } from 'express-validator';
import HttpError from '../common/http-errors.js';

import { Project } from '../models/projects.js';
import { getGeoCoordinates } from '../common/utils.js';

const projectValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Name muss zwischen 2 und 60 Zeichen lang sein'),
  body('description').optional().trim(),
  body('constructionAssociation').optional().trim(),
  body('moveIn').optional().trim(),
  body('location.street').optional().trim(),
  body('location.zip')
    .optional()
    .isLength({ min: 4, max: 5 })
    .withMessage('Ungültige PLZ'),
  body('location.city').optional().trim(),
  body('location.coordinates.lat')
    .optional()
    .isNumeric()
    .withMessage('Ungültige Latitude'),
  body('location.coordinates.lon')
    .optional()
    .isNumeric()
    .withMessage('Ungültige Longitude'),
  body('image').optional().isURL().withMessage('Ungültige Bild-URL'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Ungültige URL für die Genossenschafts-Homepage'),
];

const createProject = async (req, res, next) => {
  //Datenqualität prüfen syntaktisch:
  const result = validationResult(req); // = das Resultatobjekt d. Validierung inkl. Array mit Fehlern
  const validatedData = matchedData(req); // = nur die erfolgreich validierten und bereinigten Daten
  console.log('validatedData:', validatedData);

  // wenn Fehler -> Fehlermeldung an Client senden
  if (result.errors.length > 0) {
    console.log('result.errors:', result.array());
    return next(new HttpError('Syntaktische Fehler in der Anfrage', 422));
    // eine HttpError-Instanz mit dem Code 422 erstellen
    // und an den nächsten Middleware-Handler weitergeleitet.
  }

  try {
    // Überprüfen, ob das Projekt bereits in der Datenbank vorhanden ist
    // Eindeutige Identifizierung für Projekte um mehrfach-Speicherung in DB zu verhindern
    const existingProject = await Project.findOne({
      website: validatedData.website,
    });
    if (existingProject) {
      return next(new HttpError('Projekt ist bereits angelegt', 422));
    }

    // Geo Koordinaten holen
    const address = validatedData.location.street;
    const coordinates = await getGeoCoordinates(address);

    // Projekt in DB speichern:
    const newProject = await Project.create({
      ...validatedData,
      location: {
        ...validatedData.location,
        coordinates: coordinates,
      },
    });

    res.send(newProject);
  } catch (error) {
    console.log('Fehler beim Erstellen des Projekts', error);
    return next(new HttpError('Fehler beim Erstellen des Projekts', 422));
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    // Daten aus der Datenbank abrufen
    const projects = await Project.find({});
    // TODO populate mit Favorites
    // Erfolgreiche Antwort mit den abgerufenen Projekten senden
    res.status(200).json(projects);
  } catch (error) {
    console.error('Fehler beim Abrufen der Projekte:', error);
    // Fehler an die Fehler-Middleware weiterleiten
    return next(new HttpError('Interner Serverfehler', 500));
  }
};

const getOneProject = async (req, res, next) => {
  try {
    const projectId = req.params._id; // aus den URL-Parametern holen
    console.log('projectId:', projectId);

    // Überprüfen, ob die ID die erforderliche Länge hat (24 Zeichen)
    if (projectId.length !== 24) {
      return next(new HttpError('Ungültige Request-Parameter', 400)); // Bad Request
    }

    const project = await Project.findById(projectId);
    res.status(200).json(project);
  } catch (error) {
    console.error('Cant find project:', error.message);
    // Fehler an die Fehler-Middleware weiterleiten
    return next(new HttpError('Cant find project', 404));
  }
};

const updateProject = async (req, res, next) => {
  // TODO Checken ob Admin, sonst Route verweigern
  try {
    // neue Daten syntaktisch checken durch updateValidation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // = result.errors.length > 0
      console.log('result.errors:', result.array());
      return next(new HttpError('Syntaktische Fehler in der Anfrage', 422));
    }
    const validatedData = matchedData(req);
    console.log('validatedData:', validatedData);
    const projectId = req.params._id; // aus den URL-Parametern holen

    // Überprüfen, ob die ID die erforderliche Länge hat (24 Zeichen)
    if (projectId.length !== 24) {
      return next(new HttpError('Ungültige Projekt-ID', 400)); // Bad Request
    }

    // Project suchen und Felder ersetzen
    // Model.findOneAndUpdate(filter, update, options, callback);
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId }, // Filter: Finde das Dokument mit der entsprechenden ID
      { $set: validatedData }, // Update: Ersetze nur die übermittelten Daten des Objekts validatedData
      { new: true } // Option: Gib das aktualisierte Dokument zurück
    );

    if (!updatedProject) {
      return next(new HttpError('Projekt nicht gefunden', 404));
    }
    console.log(updatedProject);
    res.send('Project updated sucessfully');
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Projekts:', error);
    return next(new HttpError('Internal Server Error', 500));
  }
};

const deleteProject = async (req, res, next) => {
  //TODO Wenn ein Projekt gelöscht wird auch aus den Favorites löschen und User aktualisieren
  try {
    // ID kommt aus der URL
    const projectId = req.params._id;
    console.log(projectId);

    // Überprüfen, ob die ID die erforderliche Länge hat (24 Zeichen)
    if (projectId.length !== 24) {
      return next(new HttpError('Ungültige Projekt-ID', 400)); // Bad Request
    }

    // Projekt finden + löschen
    const deletedProject = await Project.findOneAndDelete({ _id: projectId });
    console.log(deletedProject);
    if (!deletedProject) {
      return next(new HttpError('Project not found', 404)); // falls Project nicht in DB gefunden wird
    }
    res.status(200).send('Projekt erfolgreich gelöscht'); //oder 204 ohne Message
  } catch (error) {
    console.error('Fehler beim Löschen des Projekts:', error.message);
    return next(new HttpError('Internal Server Error', 500));
  }
};

export {
  projectValidation,
  createProject,
  getAllProjects,
  getOneProject,
  updateProject,
  deleteProject,
};
