import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// main.jsx = Der Einstiegspunkt meiner React-Anwendung.
// Hier wird die Haupt-React-Root festgelegt und die Wurzelkomponente gerendert.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
