import HttpError from '../common/http-errors.js';
import { validationResult, matchedData, body } from 'express-validator';

import { User } from '../models/users.js';
import { checkPassword, getHash } from '../common/utils.js';

const getAllUsers = async (req, res, next) => {
  try {
    // mit select('-feldname') ausschließen
    // TODO populate mit Favorites
    const users = await User.find({}).select(
      //returnt Array/leeresArray/error-Object
      '-password -__v -createdAt -updatedAt'
    );
    res.json(users);
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    return next(new HttpError('Interner Serverfehler', 500));
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const userId = req.params.userId; // aus den URL-Parametern holen
    const user = await User.findById(userId, '-password').populate(
      'favorites',
      '-userId'
    );
    res.send(user);
  } catch (error) {
    return next(new HttpError('Cant find User', 404));
  }
};

const passwordValidation = [
  body('oldPassword').trim().isLength({ min: 8, max: 50 }),
  body('newPassword').trim().isLength({ min: 8, max: 50 }),
];

const changePassword = async (req, res, next) => {
  try {
    // Passwort syntaktische Validierung prüfen, sonst early return
    const result = validationResult(req);
    if (result.errors.length > 0) {
      console.log('result.errors:', result.array());
      return next(new HttpError('Syntaktische Fehler in der Anfrage', 422));
    }
    // neues + altes Passwort aus matchedData holen
    const validatedData = matchedData(req);
    const { oldPassword, newPassword } = validatedData;

    // gehashtes Password aus DB holen (mit foundUser aus der checkToken Middleware)
    // console.log('req.foundUser:', req.foundUser);
    const currentUser = req.foundUser;
    const hashedPasswordInDB = currentUser.password;

    // altes Passwort mit dem gehashten in der DB vergleichen
    const passwordsMatch = checkPassword(oldPassword, hashedPasswordInDB);
    if (!passwordsMatch) {
      return next(new HttpError('Ungültiges altes Passwort', 401));
    }

    try {
      // neues Passwort hashen in der DB speichern, altes löschen
      const newHashedPassword = getHash(newPassword);
      currentUser.password = newHashedPassword;
      await currentUser.save();
    } catch (error) {
      console.error(
        'Fehler beim Speichern des Passworts in die Datenbank:',
        error
      );
      return next(new HttpError('Fehler beim Speichern des Passworts', 500));
    }

    res.send('Password changed sucessfully');
  } catch (error) {
    console.error('Internal Server Error:', error);
    return next(new HttpError('Internal Server Error', 500));
  }
};

const updateValidation = [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }),
  body('email').optional().toLowerCase().normalizeEmail().isEmail(),
];

const updateUser = async (req, res, next) => {
  // wenn Token ungültig wird request schon durch checkToken verweigert
  try {
    // neue Daten syntaktisch checken durch updateValidation
    const result = validationResult(req);
    if (result.errors.length > 0) {
      console.log('result.errors:', result.array());
      return next(new HttpError('Syntaktische Fehler in der Anfrage', 422));
    }
    const validatedData = matchedData(req);

    // im Token ist die UserId
    const currentUserId = req.foundUser._id;

    // TODO Prüfung: wenn der angemeldete Benutzer kein Admin ist, dann darf er nur sich selbst löschen
    // Prüfe, ob die E-Mail-Adresse bereits von anderem User verwendet wird
    const { email } = validatedData;
    const emailExists = await User.exists({
      email: email,
      _id: { $ne: currentUserId }, //gleiche mail ABER NICHT currentUserID
    });
    if (emailExists) {
      return next(
        new HttpError('Die E-Mail-Adresse wird bereits verwendet', 422)
      );
    }
    console.log('emailExists:', emailExists);

    // User suchen und Felder ersetzen
    // Model.findOneAndUpdate(filter, update, options, callback);
    const updatedUser = await User.findOneAndUpdate(
      { _id: currentUserId }, // Filter: Finde das Dokument mit der entsprechenden ID
      { $set: validatedData }, // Update: Ersetze nur die übermittelten Daten des Objekts validatedData
      { new: true } // Option: Gib das aktualisierte Dokument zurück
    );

    if (!updatedUser) {
      return next(new HttpError('Benutzer nicht gefunden', 404));
    }
    console.log(updatedUser);
    res.send(updatedUser);
  } catch (error) {
    return next(new HttpError('Internal Server Error', 500));
  }
};

const deleteValidation = [
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Das Passwort darf nicht leer sein'),
];

const deleteUser = async (req, res, next) => {
  try {
    // User aus Token holen
    const currentUser = req.foundUser;
    console.log('User aus Token:', req.foundUser);
    if (!currentUser) {
      return next(new HttpError('User not found', 404));
    }
    // validiertes Passwort holen
    const { password } = matchedData(req);

    // gesendetes Passwort mit Hash des gefundenen User vergleichen
    const passwordsMatch = checkPassword(password, currentUser.password);
    console.log('passwordsMatch:', passwordsMatch);

    if (!passwordsMatch) {
      return next(new HttpError('Passwörter stimmen nicht überein', 401));
    }

    // TODO Projects löschen; evtl als Session!

    // User aus DB löschen
    const deletedUser = await User.deleteOne({ _id: currentUser._id });
    console.log(deletedUser);

    // Erfolgsmessage
    res.status(204).json({ message: 'User successfully deleted' });
  } catch (error) {
    return next(new HttpError('Internal Server Error', 500));
  }
};

export {
  getAllUsers,
  getOneUser,
  passwordValidation,
  changePassword,
  updateValidation,
  updateUser,
  deleteValidation,
  deleteUser,
};
