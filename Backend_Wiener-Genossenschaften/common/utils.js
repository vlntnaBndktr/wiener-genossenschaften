import HttpError from './http-errors.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { User } from '../models/users.js';

// Passwort verschlüsseln
const SALT_ROUNDS = 10;
const getHash = (plainText) => {
  // plainText verschlüsseln
  const hash = bcrypt.hashSync(plainText, SALT_ROUNDS);

  // Hash retournieren
  return hash;
};

// Passort + hashed-Passwort vergleichen
const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);

// Token erzeugen
const getToken = (payload, expiresIn = '1h') =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

// Middleware checkToken
const checkToken = async (req, res, next) => {
  // wenn Browser ein "Preflight" (Methode OPTIONS) anfordert: Anfrage OHNE Prüfung durchlassen
  // Preflight = vor der eigentlichen Anfrage, um zu überprüfen, ob die beabsichtigte Anfrage sicher und vom Server akzeptiert wird
  if (req.method === 'OPTIONS') {
    return next(); //next() ohne Argument: Anfrage erfolgreich, next(error): Fehler, Verarbeitung der Anfrage gestoppt oder an zentrale Fehlerbehandlung
  }

  // Checken ob im Header Authorization vorkommt
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new HttpError('Invalid token', 401));
  }

  // Token checken
  // authorization besteht aus 'Bearer' + ' ' + 'Token'
  const token = authorization.split(' ')[1]; // split() splits a string into an array of substrings, and returns the array

  let decoded; // = {id, issuedAt, expiration}
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return next(new HttpError('Invalid token', 401)); //zB abgelaufen, falsches Secret, Token manipuliert
  }
  // console.log('dekodierter Token:', decoded);

  // Prüfen ob UserId in DB vorhanden ist
  let foundUser;
  try {
    foundUser = await User.findById(decoded.id);
  } catch {
    return next(new HttpError('Invalid token', 401));
  }

  // steht foundUser für alle nachfolgenden Middlewares oder Routen-Handler-Funktionen zur Verfügung:
  req.foundUser = foundUser;
  console.log('Token-Check successful');
  // mit next weiterschalten (in die nächste Middleware)
  next();
};

const getGeoCoordinates = async (address) => {
  const response = await axios(
    'https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&q=' +
      encodeURIComponent(address)
  );
  console.log('address:', address);
  console.log(response.data.length);

  if (response.data.length === 0) {
    return {
      lat: 0,
      lon: 0,
    };
  }
  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
};

export { getHash, checkPassword, getToken, checkToken, getGeoCoordinates };
