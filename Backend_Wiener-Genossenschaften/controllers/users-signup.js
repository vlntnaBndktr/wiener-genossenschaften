import { validationResult, matchedData, body } from 'express-validator';
import HttpError from '../common/http-errors.js';

import { User } from '../models/users.js';
import { getHash } from '../common/utils.js';

const signupValidation = [
  body('firstName').trim().isLength({ min: 2, max: 50 }),
  body('lastName').trim().isLength({ min: 2, max: 50 }),
  body('email').toLowerCase().normalizeEmail().isEmail(),
  body('password').trim().isLength({ min: 8, max: 50 }),
];

const signup = async (req, res, next) => {
  //Datenqualität prüfen syntaktisch:
  const result = validationResult(req); // = das Resultatobjekt d. Validierung inkl. Array mit Fehlern
  const validatedData = matchedData(req); // = nur die erfolgreich validierten und bereinigten Daten
  console.log('validatedData:', validatedData);

  // wenn Fehler -> Fehlermeldung an Client senden
  if (result.errors.length > 0) {
    return next(new HttpError(JSON.stringify(result), 422));
    // eine HttpError-Instanz mit dem Code 422 erstellen
    // und an den nächsten Middleware-Handler weitergeleitet.
  }

  try {
    // Überprüfen, ob die E-Mail-Adresse bereits in der Datenbank vorhanden ist
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return next(new HttpError('E-Mail-Adresse wird bereits verwendet', 422));
    }
    // Passwort hashen
    const hashedPassword = getHash(validatedData.password);
    console.log('hashedPassword:', hashedPassword);

    // User in DB speichern:
    // validierte Daten + hashedPassword = newUser
    const newUser = await User.create({
      ...validatedData,
      password: hashedPassword,
      favorites: [],
    });
    res.send(newUser);
  } catch (error) {
    console.log('Fehler beim Erstellen des Users', error);
    return next(new HttpError('Fehler beim Erstellen des Users', 422));
  }
};

export { signupValidation, signup };
