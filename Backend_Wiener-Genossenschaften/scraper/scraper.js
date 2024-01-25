import * as fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Importieren der Funktion dataProject
import dataProject from './dataProject.js';
import { Project } from '../models/projects.js';

// Array zum Speichern der extrahierten Daten
const data = [];

// Konstanten für die Basis-URL der 'Übersichtsseite'
const baseURL = 'https://www.wbv-gpa.at/projekt/';

// Hauptfunktion zum Extrahieren von Links und Daten
export default async function extractLinks(URL) {
  try {
    // HTTP-Anfrage, um die HTML-Seite zu erhalten
    const response = await axios.get(URL);
    const html = response.data; //gesamtes HTML der Seite

    // Cheerio verwenden zum Parsen der HTML-Seite
    const $ = cheerio.load(html);

    // Array für die Speicherung von Promises für jede gefundenen Projekt-URL
    const promises = [];

    // Elemente aus dem HTML selektieren
    // $=Cheerio-Object: Alle die mit <a[href] + baseURL beginnen
    $('a[href^="' + baseURL + '"]').each(async (index, element) => {
      const link = $(element); // für jedes Element das so beginnt
      const href = link.attr('href'); // href Attribut des Elements

      // ==> dataProject() returned gescrapte Daten von der 'Projekt-Seite'
      const projectPromise = dataProject(href).then(async (scrapedObject) => {
        const {
          name,
          description,
          constructionAssociation,
          moveIn,
          address,
          image,
        } = scrapedObject;

        const result = {
          name,
          description,
          constructionAssociation,
          moveIn,
          location: {
            street: address,
          },
          image,
          website: href,
        };

        data.push(result);
      });

      promises.push(projectPromise);
    });

    // Warten bis alle Promises aufgelöst sind
    await Promise.all(promises);

    // Alle Daten sind jetzt in der 'data'-Variable gesammel

    // Daten in die MongoDB schreiben
    try {
      // Iteriere durch die gesammelten Daten und speichere sie in der MongoDB
      for (const result of data) {
        const project = await Project.create(result);
        console.log(
          'Projekt erfolgreich in MongoDB gespeichert:',
          project.name
        );
      }
    } catch (err) {
      console.error(
        'Fehler beim Speichern der extrahierten Daten in MongoDB:',
        err
      );
    }

    console.log('Alle Daten erfolgreich in DB gespeichert');
  } catch (error) {
    console.error('Ein Fehler ist aufgetreten:', error);
  }
}

// // Daten in JSON-Format konvertieren
// const jsonString = JSON.stringify(data, null, 2);
// // JSON-Daten in eine Datei schreiben
// fs.writeFileSync('OutputNeueProjekte.json', jsonString);
