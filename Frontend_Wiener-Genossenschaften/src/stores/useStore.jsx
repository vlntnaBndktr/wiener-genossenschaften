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
  bears: 0,
  projects: [],
};

// benutzerdefinierten Zustandshook erzeugen
// enthält initialStates
const useStore = create((set) => ({
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
        console.error('im catch-Block: ', error);
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
          throw new Error('Fehler beim Anmelden');
        }
      })
      .then((response) => {
        // Stammdaten als 'user' speichern
        set({ user: response.data });
        // console.log('user: ', user);
      })
      .catch((error) => {
        console.error('im catch-Block: ', error);
        set({ error }); // = set({ error: error })
      })
      .finally(() => {
        set({ loading: false }); // Request an den Server abgeschlossen (egal ob Sucess oder Error)
      });
  },
}));

export default useStore;
