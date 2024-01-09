import HttpError from '../common/http-errors.js';

import { User } from '../models/users.js';
import { checkPassword, getToken } from '../common/utils.js';

const login = async (req, res, next) => {
  try {
    // email + passwort aus dem Body holen
    const { email, password } = req.body;

    // prüfen ob email in DB existiert, sonst early-return
    const user = await User.findOne({ email: email }); // returned user-Objekt/null/error-Objekt
    if (!user) {
      return next(new HttpError('User not found', 401));
    }

    // hashedPassword aus der DB holen
    const hashedPassword = user.password;
    console.log(hashedPassword);

    // gehashtes Passwort mit dem eingegebenen Passwort vergleichen
    const passwordsMatch = checkPassword(password, hashedPassword);
    if (passwordsMatch === null) {
      return next(new HttpError('Password check failed', 500)); //falls Vergleichsprozess fehlschlägt
    }
    if (!passwordsMatch) {
      return next(new HttpError('wrong email or password', 401));
    }

    // erstelle JWT mit der UserId und sende ihn als Antwort an Client
    const token = getToken({ id: user.id });
    if (!token) {
      return next(new HttpError('Error creating token', 500)); // Wenn bei der Token-Erstellung ein Fehler auftritt
    }

    res.send(token);
  } catch (error) {
    // Allgemeiner Serverfehler
    console.error('Error in login:', error);
    return next(new HttpError('Internal Server Error', 500));
  }
};

const logout = async (req, res, next) => {
  try {
    // Löschen des Cookies um Benutzer auszuloggen
    // (Token selbst bleibt gültig, aber ohne passenden Cookie im Browser hat User keinen authentifizierten Status mehr)
    // zB: res.clearCookie('token');
    res.status(200).send('Logout erfogreich');
  } catch (error) {
    console.error('Logout failed:', error.message);
    // Fehler an die Fehler-Middleware weiterleiten
    return next(new HttpError('Internal Server Error', 404));
  }
};

export { login, logout };
