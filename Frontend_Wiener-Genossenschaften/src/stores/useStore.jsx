import { create } from 'zustand'; //  State-Management-Tool "zustand"
import { myfetchAPI } from '../utils/fetch';
import { HOST } from '../utils/const';
import { jwtDecode } from 'jwt-decode';

// initialer Zustand:
const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
  login: null,
  password: null,
  newUser: null,
  success: false,
  bears: 0,
  projects: [],
};

// benutzerdefinierten Zustandshook erzeugen
// enthält initialStates
const useStore = create((set, get) => ({
  ...initialState,

  //Bärenbeispiel
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  //....//

  // Funktion um Projekte von der API abzurufen
  // Spezieller Syntax im Statemanagement
  getAllProjects: () => {
    // Reset State loading: ein Request wird an den Server gesendet
    set({ loading: true, error: null });

    // API Aufruf mit vorgefertigter myfetchAPI
    myfetchAPI({ url: HOST + '/projects' })
      .then((response) => {
        // in response.data sind meine Projects
        if (response.status >= 200 && response.status < 300) {
          set({ projects: response.data });
        } else {
          throw new Error('Fehler beim Abrufen der Projekte');
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

  login: (email, password) => {
    // reset State
    set({ loading: true, error: null, user: null });
    // API Aufruf mit vorgefertigter myfetchAPI
    myfetchAPI({
      url: HOST + '/user/login',
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
          set({ token, decodedToken });

          // Stammdaten vom angemeldeten User holen
          return myfetchAPI({ url: HOST + '/user/' + decodedToken.id });
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
        set({ error }); // = set({ error: error })
      })
      .finally(() => {
        set({ loading: false }); // Request an den Server abgeschlossen (egal ob Sucess oder Error)
      });
  },
  signup: (firstName, lastName, email, password) => {
    // bekommt Daten aus einer Maske über Parameter
    set({ loading: true, error: null, newUser: null });

    // Neuregistrierung im Backend versuchen
    myfetchAPI({
      url: HOST + '/user/signup',
      method: 'post',
      data: { firstName, lastName, email, password },
    })
      .then((response) => {
        // reponse.data = der neue User, Statuscode = 201
        if (response.status === 200) {
          set({ newUser: response.data });
          console.log('newUser:', response.data);
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
      url: HOST + '/user/update',
      method: 'patch',
      data: { firstName, lastName, email },
      token: get().token,
    })
      .then((response) => {
        // reponse.data =
        if (response.status === 200) {
          set({ user: response.data, success: true });
          console.log('updated User:', response.data);
        } else {
          throw new Error('Fehler beim User-Update');
        }
      })
      .catch((error) => {
        console.log('ich bin in updateUser-catch', error);
        set({ error });
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
    console.log('Token:', get().token);
    // in req.params wird die _projectId übermittelt
    myfetchAPI({
      url: HOST + '/favorite/' + projectId,
      method: 'post',
      token: get().token,
    })
      .then((response) => {
        // reponse.data =
        if (response.status === 200) {
          set({ user: response.data, success: true });
          console.log('updated User:', response.data);
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
    console.log('Token:', get().token);
    // in req.params wird die _projectId übermittelt
    myfetchAPI({
      url: HOST + '/favorite/delete/' + projectId,
      method: 'delete',
      token: get().token,
    })
      .then((response) => {
        // reponse.data =
        if (response.status === 200) {
          set({ user: response.data, success: true });
          console.log('updated User:', response.data);
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
}));

export default useStore;
