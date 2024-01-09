import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routesPublic } from '../src/routes/routes';

const App = () => {
  const router = createBrowserRouter(routesPublic);
  return <RouterProvider router={router} />;
};

export default App;
