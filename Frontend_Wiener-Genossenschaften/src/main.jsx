import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import './index.css';
import ButtonUsage from './components/test.jsx';
import Login from './components/Login.jsx';
import StickyFooter from './components/StickyFooter.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <ButtonUsage />
    <Login />
    <StickyFooter />
  </React.StrictMode>
);
