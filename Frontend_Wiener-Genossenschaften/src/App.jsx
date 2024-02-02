import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useStore from './stores/useStore';
import { routesPublic, routesPrivate } from '../src/routes/routes';
import { useEffect } from 'react';

const App = () => {
  // Prüfen ein User vorhanden ist, also user != null
  const { user, checkToken } = useStore();
  // console.log('Angemeldeter User:', user);

  // als useEffect mit [] wird jedes mal beim neu-Mounten ausgeführt. Jedesmal wenn view geändert wird, wird App neu gemounted
  // checkToken: sobald man refresh macht ist user wieder null, dann schaut die Funktion im localStorage ob ein Token da ist
  useEffect(() => {
    checkToken();
  }, []);

  const router = createBrowserRouter(user ? routesPrivate : routesPublic);
  return <RouterProvider router={router} />;
};

export default App;
