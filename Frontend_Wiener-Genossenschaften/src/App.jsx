import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routesPublic, routesPrivate } from '../src/routes/routes';

const App = () => {
  const user = false;
  const router = createBrowserRouter(user ? routesPrivate : routesPublic);
  return <RouterProvider router={router} />;
};

export default App;
