import LayoutPublic from '../layouts/LayoutPublic';
import LayoutPrivate from '../layouts/LayoutPrivate';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import User from '../views/User';
import TestComponent from '../views/TestComponent';
import Favorites from '../views/Favorites';
import Profile from '../components/ChangeProfile';
import MyMap from '../views/Map';
import ProfilDaten from '../components/ProfilDaten';

/* routes.jsx = Routen meiner Anwendung definieren. 
Zwischen öffentlichen und privaten Routen unterscheinden.
Verschiedene Layouts für verschiedene Seiten verwenden.*/

// wenn User NICHT eingelogged ist
const routesPublic = [
  {
    path: '',
    element: <LayoutPublic />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/test',
        element: <TestComponent />,
      },
      // Default Route:
      {
        path: '*',
        element: <Login />,
      },
    ],
  },
];

// wenn User eingelogged ist
const routesPrivate = [
  {
    path: '',
    element: <LayoutPrivate />,
    children: [
      {
        path: '/',
        element: <User />,
      },
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '/profile',
        element: <ProfilDaten />,
      },
      {
        path: '/map',
        element: <MyMap />,
      },
      {
        path: '/test',
        element: <TestComponent />,
      },
      // Default Route:
      {
        path: '*',
        element: <User />,
      },
    ],
  },
];

export { routesPublic, routesPrivate };
