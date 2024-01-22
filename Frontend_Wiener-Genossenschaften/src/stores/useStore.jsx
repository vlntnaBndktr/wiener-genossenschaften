import { create } from 'zustand'; //  State-Management-Tool "zustand"

import { HOST } from '../utils/const';

// initialer Zustand:
const initialState = {
  projects: [],
  loading: false,
  error: null,
  bears: 0,
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
  fetchProjects: async () => {
    // loading: ein Request wird an den Server gesendet
    set({ loading: true, error: null });

    try {
      const response = await fetch(HOST + '/projects');
      const data = await response.json();

      if (response.ok) {
        set({ projects: data });
      } else {
        throw new Error('Fehler beim Abrufen der Projekte');
      }
    } catch (error) {
      set({ error }); // = set({ error: error })
    } finally {
      set({ loading: false }); // Request an den Server abgeschlossen (egal ob Sucess oder Error)
    }
  },
}));

export default useStore;
