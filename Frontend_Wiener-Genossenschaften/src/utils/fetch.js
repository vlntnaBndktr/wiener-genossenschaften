import axios from 'axios';

const myfetchAPI = (options = {}) => {
  // Standardkonfiguration für Axios-Anfrage
  const defaultOptions = {
    method: 'get',
    url: '/',
    data: {},
  };
  // Mischen der übergebenen Optionen mit der Standardkonfiguration
  const fetchConfig = { ...defaultOptions, ...options };

  // Axios Aufruf durchführen und auf die Antwort warten
  return axios(fetchConfig);
};

export { myfetchAPI };
