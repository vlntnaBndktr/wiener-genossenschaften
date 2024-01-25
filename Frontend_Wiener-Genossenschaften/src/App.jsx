import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useStore from './stores/useStore';
import { routesPublic, routesPrivate } from '../src/routes/routes';
import { useEffect } from 'react';

const App = () => {
  // Prüfen ein User vorhanden ist, also user != null
  const { user, getAllProjects } = useStore();
  console.log('Angemeldeter User:', user);

  useEffect(() => {
    // Prüfen ob Token vorhanden
    const token = localStorage.getItem('token');
    if (token) {
      // Benutzer ist angemeldet, daher rufe die Methode getAllProjects auf oder andere notwendige Aktionen
      getAllProjects();
      console.log('Token vorhanden!:', token);
    }
  }, [getAllProjects]);

  const router = createBrowserRouter(user ? routesPrivate : routesPublic);
  return <RouterProvider router={router} />;
};

export default App;
