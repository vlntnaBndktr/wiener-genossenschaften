import React from 'react';
import LayoutMain from '../layouts/LayoutMain';
import LoginForm from '../components/LoginForm';
import MainStatic from '../components/MainStatic';

/* Login.jsx = eine spezifische Seite (Login-Seite) wird erstellt und in LayoutMain eingefügt. 
Die linke Seite kann für Dinge wie Logo, Namen, Navigation und Footer verwendet werden, 
die rechte Seite ist für das Login-Formular reserviert */

const Login = () => {
  return (
    <LayoutMain>
      <MainStatic />
      <LoginForm />
    </LayoutMain>
  );
};

export default Login;
