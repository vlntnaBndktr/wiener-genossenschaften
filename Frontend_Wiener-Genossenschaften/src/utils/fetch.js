import axios from 'axios';

const myfetchAPI = (options = {}) => {
  // Standardkonfiguration für Axios-Anfrage
  const defaultOptions = {
    method: 'get',
    url: '/',
    data: {},
  };

  // Falls Token mitgegeben werden muss
  const headers = options.token
    ? {
        Authorization: 'Bearer ' + options.token,
      }
    : {};

  // Mischen der übergebenen Optionen mit der Standardkonfiguration
  const fetchConfig = { ...defaultOptions, ...options, headers };

  // Axios Aufruf durchführen und auf die Antwort warten
  return axios(fetchConfig);
};

export { myfetchAPI };
