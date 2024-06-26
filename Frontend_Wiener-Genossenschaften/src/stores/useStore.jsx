import { create } from 'zustand'; //  State-Management-Tool "zustand"
import { myfetchAPI } from '../utils/fetch';
import { jwtDecode } from 'jwt-decode';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// initialer Zustand:
const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
  email: null,
  password: null,
  newUser: null,
  success: false,
  errorMessage: null,
  projects: [],
  favorites: [],
};

// benutzerdefinierten Zustandshook erzeugen
// enthält initialStates
const useStore = create((set, get) => ({
  ...initialState,

  checkToken: () => {
    // wenn user object vorhanden ist dann prüfen, ob der Token noch gültig ist
    if (get().user) {
      if (get().decodedToken.exp - +new Date() / 1000 < SECONDS_TO_RELOGIN) {
        if (get().email && get().password) {
          return get().login(get().email, get().password);
        }
        return get().logout();
      }
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const decodedToken = jwtDecode(token);
    set({ token, decodedToken });

    // Stammdaten vom angemeldeten Benutzer holen
    myfetchAPI({ url: apiUrl + '/user/' + decodedToken.id })
      .then((response) => {
        // Stammdaten als "user" speichern
        set({ user: response.data });
      })
      .catch((error) => {
        // console.log('ich bin in catch', error);
        set({ error });
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },

  // Funktion um Projekte von der API abzurufen
  // Spezieller Syntax im Statemanagement
  getAllProjects: () => {
    // Reset State loading: ein Request wird an den Server gesendet
    set({ loading: true, error: null });

    // API Aufruf mit vorgefertigter myfetchAPI
    myfetchAPI({ url: apiUrl + '/projects' })
      .then((response) => {
        // in response.data sind meine Projects
        if (response.status >= 200 && response.status < 300) {
          set({ projects: response.data });
          console.log('projects im Store abgerufen:', response.data);
        } else {
          throw new Error('Fehler beim Abrufen der Projekte');
        }
      })
      .catch((error) => {
        console.error('im getAllProjects catch-Block: ', error);
        set({ error }); // = set({ error: error })
      })
      .finally(() => {
        set({ loading: false }); // Request an den Server abgeschlossen (egal ob Sucess oder Error)
      });
  },

  login: (email, password) => {
    // reset State
    set({ loading: true, error: null, user: null });
    // API Aufruf mit vorgefertigter myfetchAPI
    myfetchAPI({
      url: apiUrl + '/user/login',
      method: 'post',
      data: { email, password },
    })
      .then((response) => {
        if (response.status === 200) {
          // Anmeldung erfolgreich

          // Token aus response Objekt holen und in localStorage vom Browser speichern
          const token = response.data;
          localStorage.setItem('token', token);

          // Token dekodieren und State aktualisieren
          const decodedToken = jwtDecode(token);
          console.log(decodedToken); //Object { id: "65ad555e5065ea5493d49d79", iat: 1705945828, exp: 1705949428 }
          set({ token, decodedToken, email, password });

          // Stammdaten vom angemeldeten User holen
          return myfetchAPI({ url: apiUrl + '/user/' + decodedToken.id });
        } else {
          throw new Error('Fehler beim Login');
        }
      })
      .then((response) => {
        // Stammdaten als 'user' speichern
        set({ user: response.data });
        // console.log('user: ', user);
      })
      .catch((error) => {
        console.error('im catch-Block: ', error.response);
        set({ error, errorMessage: error.response.data.message }); // Error-Message vom Server
        // = set({ error: error })
      })
      .finally(() => {
        set({ loading: false }); // Request an den Server abgeschlossen (egal ob Sucess oder Error)
      });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ ...initialState });
  },

  signup: (firstName, lastName, email, password) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, newUser: null });

    // Neuregistrierung im Backend versuchen
    myfetchAPI({
      url: apiUrl + '/user/signup',
      method: 'post',
      data: { firstName, lastName, email, password },
    })
      .then((response) => {
        // reponse.data = der neue User, Statuscode = 201
        if (response.status === 200) {
          set({ newUser: response.data });
          // console.log('newUser:', response.data);
        } else {
          throw new Error('Fehler bei der Registrierung');
        }
      })
      .catch((error) => {
        console.log('ich bin in catch', error);
        set({ error });
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },

  updateUser: (firstName, lastName, email) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, success: false });

    // Daten ans Backend senden
    myfetchAPI({
      url: apiUrl + '/user/update',
      method: 'patch',
      data: { firstName, lastName, email },
      token: get().token,
    })
      .then((response) => {
        // reponse.data =
        if (response.status === 200) {
          set({ user: response.data, success: true });
          // console.log('updated User:', response.data);
        } else {
          throw new Error('Fehler beim User-Update');
        }
      })
      .catch((error) => {
        console.log('ich bin in updateUser-catch', error.response.data.message);
        set({ error, errorMessage: error.response.data.message }); // Error-Message vom Server
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },
  changePassword: (oldPassword, newPassword) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, success: false });

    // Passwort ändern im Backend versuchen
    myfetchAPI({
      url: apiUrl + '/user/change-password',
      method: 'patch',
      data: { oldPassword, newPassword },
      token: get().token,
    })
      .then((response) => {
        // reponse.data = 'Password changed successfully'
        if (response.status === 200) {
          set({ success: true });
        } else {
          throw new Error('Fehler beim Ändern des Passworts');
        }
      })
      .catch((error) => {
        // console.log('ich bin in catch', error);
        set({ error, errorMessage: error.response.data.message }); // Error-Message vom Server
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },
  createFavorite: (projectId) => {
    // Reset
    set({ loading: true, error: null, success: false });
    // im Token wird die userId geschickt
    // console.log('Token:', get().token);
    // in req.params wird die _projectId übermittelt
    myfetchAPI({
      url: apiUrl + '/favorite/' + projectId,
      method: 'post',
      token: get().token,
    })
      .then((response) => {
        // reponse.data =
        if (response.status === 200) {
          set({ user: response.data, success: true });
        } else {
          throw new Error('Fehler beim anlegen des Favorites');
        }
      })
      .catch((error) => {
        console.log('ich bin in createFavorite-catch', error);
        set({ error });
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },
  deleteFavorite: (projectId) => {
    // Reset
    set({ loading: true, error: null, success: false });
    // im Token wird die userId geschickt
    // in req.params wird die projectId übermittelt
    myfetchAPI({
      url: apiUrl + '/favorite/delete/' + projectId,
      method: 'delete',
      token: get().token,
    })
      .then((response) => {
        // reponse.data =
        if (response.status === 200) {
          const updatedUser = response.data;

          // Extrahiere die Favoriten aus dem aktualisierten Benutzerobjekt
          const updatedFavorites = updatedUser.favorites;

          // Setze den Benutzer und die Favoriten im Zustand
          set({
            user: updatedUser,
            favorites: updatedFavorites,
            success: true,
          });
        } else {
          throw new Error('Fehler beim anlegen des Favorites');
        }
      })
      .catch((error) => {
        console.log('ich bin in deleteFavorite-catch', error);
        set({ error });
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },
  getAllFavorites: () => {
    // Reset State loading: ein Request wird an den Server gesendet
    set({ loading: true, error: null });

    // API Aufruf mit vorgefertigter myfetchAPI
    // Token mit userID wird gebraucht
    myfetchAPI({
      url: apiUrl + '/favorites',
      token: get().token,
    })
      .then((response) => {
        // in response.data sind meine Favorites
        if (response.status >= 200 && response.status < 300) {
          set({ favorites: response.data });
          // in der response ist unter 'project' das ganze project-Objekt
        } else {
          throw new Error('Fehler beim Abrufen der Favorites');
        }
      })
      .catch((error) => {
        console.error('im catch-Block: ', error.response);
        set({ error }); // = set({ error: error })
      })
      .finally(() => {
        set({ loading: false }); // Request an den Server abgeschlossen (egal ob Sucess oder Error)
      });
  },
  updateFavorite: (favoriteId, formattedValues) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, success: false });
    console.log(
      'in updateFavorite: favoriteID + formattedValues:',
      favoriteId,
      formattedValues
    );

    // Daten ans Backend senden
    myfetchAPI({
      url: apiUrl + '/favorite/update/' + favoriteId,
      method: 'patch',
      data: formattedValues,
      token: get().token,
    })
      .then((response) => {
        // reponse.data =
        if (response.status === 200) {
          const updatedUser = response.data.user;
          set({
            user: updatedUser,
            favorites: updatedUser.favorites,
            success: true,
          });
          console.log('response:', response.data);
        } else {
          throw new Error('Fehler beim Favorite-Update');
        }
      })
      .catch((error) => {
        console.log(
          'ich bin in updateFavorite-catch',
          error.response.data.message
        );
        set({ error, errorMessage: error.response.data.message }); // Error-Message vom Server
      })
      .finally(() => {
        // Laden der Daten beendet
        set({ loading: false });
      });
  },
}));

export default useStore;
