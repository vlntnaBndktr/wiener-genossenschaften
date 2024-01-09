import LayoutMain from '../layouts/LayoutMain';
import Login from '../views/Login';

/* routes.jsx = Routen meiner Anwendung definieren. 
Zwischen öffentlichen und privaten Routen unterscheinden.
Verschiedene Layouts für verschiedene Seiten verwenden.*/

const routesPublic = [
  {
    path: '',
    element: <LayoutMain />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
];

export { routesPublic };
