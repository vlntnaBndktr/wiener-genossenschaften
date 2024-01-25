import * as fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Importieren der Funktion dataProject
import dataProject from './dataProject.js';

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
    console.log($('.footer__inner__contact').text());

    // Array für die Speicherung von Promises für jede gefundenen Projekt-URL
    const promises = [];

    // Elemente aus dem HTML selektieren
    // $=Cheerio-Object: Alle die mit <a[href] + baseURL beginnen
    $('a[href^="' + baseURL + '"]').each(async (index, element) => {
      const link = $(element); // für jedes Element das so beginnt
      const href = link.attr('href'); // href Attribut des Elements

      // Infos über 1 Projekt
      const projectInfos = [];

      // ==> dataProject() returned gescrapte Daten von der 'Projekt-Seite'
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
        // try {
        //   const project = await Project.create(result);
        //   console.log(
        //     'Extrahierte Daten erfolgreich in MongoDB gespeichert:',
        //     project
        //   );
        // } catch (err) {
        //   console.error(
        //     'Fehler beim Speichern der extrahierten Daten in MongoDB:',
        //     err
        //   );
        // }

        data.push(result);
        // console.log('data:', data);
      });

      promises.push(promise);
    });

    // Warten bis alle Promises aufgelöst sind
    await Promise.all(promises);

    // Daten in JSON-Format konvertieren
    const jsonString = JSON.stringify(data, null, 2);
    // console.log('jsonString:', jsonString);

    // JSON-Daten in eine Datei schreiben
    fs.writeFileSync('OutputNeueProjekte.json', jsonString);

    console.log('File created successfully.');
  } catch (error) {
    console.error('Ein Fehler ist aufgetreten:', error);
  }
}
