import { validationResult, matchedData, body } from 'express-validator';
import HttpError from '../common/http-errors.js';

import { Favorite } from '../models/favorites.js';
import { User } from '../models/users.js';

const favoriteValidation = [
  body('registrationDate').optional().isISO8601().toDate(),
  body('registrationExpiryDate').optional().isISO8601().toDate(),
  body('alarm').optional().isISO8601().toDate(),
  body('notes.*.text').optional().isString(),
  body('notes.*.timestamp').optional().isISO8601().toDate(),
];

const createFavorite = async (req, res, next) => {
  try {
    // im Token ist die userId
    const userId = req.foundUser._id;

    // in req.params ist die favoriteId
    const favoriteId = req.params._favoriteId;

    // Datenqualität der Zusatzinfos prüfen (syntaktisch)
    const result = validationResult(req); // = das Resultatobjekt d. Validierung inkl. Array mit Fehlern
    const validatedData = matchedData(req); // = nur die erfolgreich validierten und bereinigten Daten
    console.log('validatedData:', validatedData);

    // wenn Fehler -> Fehlermeldung an Client senden
    if (result.errors.length > 0) {
      console.log('result.errors:', result.array());
      return next(new HttpError('Syntaktische Fehler in der Anfrage', 422));
    }

    // Überprüfen, ob Favorite bereits in der Datenbank vorhanden ist
    const existingFavorite = await Favorite.findOne({
      userId: userId,
      favoriteId: favoriteId,
    });
    if (existingFavorite) {
      return next(new HttpError('Favorite ist bereits angelegt', 422));
    }

    // Favorite in DB speichern
    const newFavorite = await Favorite.create({
      userId,
      favoriteId,
      ...validatedData,
    });

    // Favorite ID im User-Document speichern:
    // ID des neuen Favoriten zum Benutzer hinzufügen
    await User.findByIdAndUpdate(userId, {
      $push: { favorites: newFavorite._id },
    });
    //Model.findByIdAndUpdate(id, update); mit $push Operator

    console.log('newFavorite:', newFavorite);
    res.status(200).send('Favorite erfolgreich gespeichert');
  } catch (error) {
    console.error('Fehler beim Anlegen des Favorites:', error.message);
    return next(new HttpError('Internal Server Error', 500));
  }
};

const updateFavorite = async (req, res, next) => {
  // favoriteId kommt aus der URL; userId aus dem Token
  const userId = req.foundUser._id;
  const favoriteId = req.params._id;
  console.log('userId:', userId);

  // Nur eigene Favorites können geupdated werden!
  const authorizedFavorite = await Favorite.findOne({
    _id: favoriteId,
    userId: userId,
  });
  if (!authorizedFavorite) {
    return next(
      new HttpError(
        'Unauthorized: Der Favorite gehört nicht dem aktuellen Benutzer',
        401
      )
    );
  }

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

    // Überprüfen, ob die ID die erforderliche Länge hat (24 Zeichen)
    if (favoriteId.length !== 24) {
      return next(new HttpError('Ungültige Request-Parameter', 400)); // Bad Request
    }

    // Felder in authorizedFavorite ersetzen
    authorizedFavorite.set(validatedData);
    const updatedFavorite = await authorizedFavorite.save(); // Speichere die Änderungen

    if (!updatedFavorite) {
      return next(new HttpError('Favorite nicht gefunden', 404));
    }
    console.log(updatedFavorite);
    res.status(200).send('Favorite updated sucessfully');
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Favorites:', error);
    return next(new HttpError('Internal Server Error', 500));
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    // favoriteId kommt aus der URL; userId aus dem Token
    const userId = req.foundUser._id;
    const favoriteId = req.params._id;
    console.log('userId:', userId);

    // Überprüfen, ob die ID die erforderliche Länge hat (24 Zeichen)
    if (favoriteId.length !== 24) {
      return next(new HttpError('Ungültige Favorite-ID', 400)); // Bad Request
    }

    // Nur eigene Favorites können gelöscht werden!
    const authorizedFavorite = await Favorite.findOne({
      _id: favoriteId,
      userId: userId,
    });
    if (!authorizedFavorite) {
      return next(
        new HttpError(
          'Unauthorized: Der Favorite gehört nicht dem aktuellen Benutzer oder existiert nicht',
          401
        )
      );
    }

    // Favorite finden + löschen
    const deletedFavorite = await Favorite.findOneAndDelete({
      _id: favoriteId,
    });
    console.log(deletedFavorite);

    // !Auch aus dem Array im User-Dokument löschen:
    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: favoriteId },
    });

    res.status(200).send('Favorite erfolgreich gelöscht');
  } catch (error) {
    console.error('Fehler beim Löschen des Favorites:', error.message);
    return next(new HttpError('Internal Server Error', 500));
  }
};

const getAllFavorites = async (req, res, next) => {
  // TODO Admin Rechte auch ohne Token
  try {
    // User identifizieren
    const userId = req.foundUser._id;
    // Daten aus der Datenbank abrufen
    const favorites = await Favorite.find({ userId: userId });
    // Erfolgreiche Antwort mit den abgerufenen Favorites senden
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Fehler beim Abrufen der Favorites:', error);
    // Fehler an die Fehler-Middleware weiterleiten
    return next(new HttpError('Interner Serverfehler', 500));
  }
};

const getOneFavorite = async (req, res, next) => {
  try {
    const favoriteId = req.params._id; // aus den URL-Parametern holen
    console.log('favoriteId:', favoriteId);

    // Überprüfen, ob die ID die erforderliche Länge hat (24 Zeichen)
    if (favoriteId.length !== 24) {
      return next(new HttpError('Ungültige Request-Parameter', 400)); // Bad Request
    }

    const favorite = await Favorite.findById(favoriteId);
    res.status(200).json(favorite);
  } catch (error) {
    console.error('Cant find favorite:', error.message);
    // Fehler an die Fehler-Middleware weiterleiten
    return next(new HttpError('Cant find favorite', 404));
  }
};

export {
  favoriteValidation,
  createFavorite,
  updateFavorite,
  deleteFavorite,
  getAllFavorites,
  getOneFavorite,
};
