import * as fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Importieren der Funktion dataProject
import dataProject from './dataProject.js';
import { Project } from '../models/projects.js';

// Konstanten für die Basis-URL
const baseURL = 'https://www.wbv-gpa.at/projekt/';

// Array zum Speichern der extrahierten Daten
const data = [];

// Hauptfunktion zum Extrahieren von Links und Daten
export default async function extractLinks(url) {
  try {
    // HTTP-Anfrage, um die HTML-Seite zu erhalten
    const response = await axios.get(url);
    const html = response.data;

    // Cheerio verwenden zum Parsen der HTML-Seite
    const $ = cheerio.load(html);

    // Array für die Speicherung von Promises für jede gefundenen Projekt-URL
    const promises = [];

    $('a[href^="' + baseURL + '"]').each(async (index, element) => {
      const link = $(element);
      const href = link.attr('href');

      const spanObjects = [];

      // Iterate over each span element within the link
      link.find('div > span').each((spanIndex, spanElement) => {
        const spanText = $(spanElement).text().trim();

        // Create a separate object for each span text
        const spanObject = {
          spanText: spanText,
        };

        spanObjects.push(spanObject);
      });

      const promise = dataProject(href).then(async (object) => {
        const result = {
          name: object.nameProject,
          description: object.descriptionProject,
          location: {
            street: object.addressProject,
          },
          image: object.imageProject,
          website: href,
        };

        // Ergebnis in der MongoDB speichern
        try {
          const project = await Project.create(result);
          console.log(
            'Extrahierte Daten erfolgreich in MongoDB gespeichert:',
            project
          );
        } catch (err) {
          console.error(
            'Fehler beim Speichern der extrahierten Daten in MongoDB:',
            err
          );
        }

        data.push(result);
      });

      promises.push(promise);
    });

    // Warten bis alle Promises aufgelöst sind
    await Promise.all(promises);

    // Daten in JSON-Format konvertieren
    const jsonString = JSON.stringify(data, null, 2);

    // JSON-Daten in eine Datei schreiben
    fs.writeFileSync('outputBestehendeObjekte.json', jsonString);

    console.log('File created successfully.');
  } catch (error) {
    console.log(error);
  }
}
