import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './routes/router.js';

import HttpError from './common/http-errors.js';
// import { User } from './models/users.js';
// import { Project } from './models/projects.js';

import extractLinks from './scraper/scraper.js';
import extractFlatLinks from './scraper/flatsScraper.js';

dotenv.config();

// Entweder / oder ||
const PORT = process.env.PORT || 5000;

// 1. Konfiguration bzw. grundlegende Eistellungen der Express-App:
// Express ersetzt hier http von NodeJS
const app = express();

// sichert den Server ab
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    },
  })
);

// verhindert CORS Probleme im Browser bei API-Aufruf
// um mit JS von einer Webseite aus auf eine API zuzugreifen, die auf einer anderen Domain gehostet ist
app.use(cors());

// Form body parser
app.use(express.urlencoded({ extended: true }));

// JSON parser
app.use(express.json());

// 2. Definiere die Haupt-Route:
// Ausgabe an den Client
app.get('/', (req, res) => {
  res.send('Root wurde aufgerufen');
});

// 3. Verteilt alle Anfragen die mit /api beginnen an die Routen:
app.use('/api', router);

// 4. wenn keine passende Route für die eingehende Anfrage gefunden wird:
app.use((req) => {
  throw new HttpError('Could not find route: ' + req.originalUrl, 404);
});

// 5. zentrale Fehlerbehanldung (In Express wird eine Middleware zu einer zentralen Fehlerbehandlung, wenn sie 4 Parameter in ihrer Signatur hat)
// wenn es zu einem Fehler während der Anfrage-Verarbeitung kommt
app.use((error, req, res, next) => {
  // wenn bereits ein Header gesetzt wurde, keinen response senden sondern einfach weiterschalten
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.errorCode || 500)
    .json({ message: error.message || 'Unknow error' });
});

// 6. Verbinde den Server mit der MongoDB-Datenbank:
const CONNECTION_STRING = `mongodb+srv://benediktervalentina:${process.env.MONGODB_PASSWORD}@wienergenossenschaften.tprp5yt.mongodb.net/WGDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    // Webserver wird gestartet
    console.log('MongoDB verbunden');
    app.listen(PORT, () => {
      console.log('Express Server läuft unter http://localhost:' + PORT);
    });
  })
  .catch((error) => {
    console.log('Verbindung MongoDB nicht möglich!', error);
  });

// const URL = 'https://www.wbv-gpa.at/wohnungen/';
const URL = 'https://www.wbv-gpa.at/wohnungen/neue-projekte/';

// await extractLinks(URL);
// await extractFlatLinks(URL);
