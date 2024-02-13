import * as cheerio from 'cheerio';
import dataProject from './dataProject.js';

const URL = 'https://www.wbv-gpa.at/wohnungen/neue-projekte/';
const baseURL = 'https://www.wbv-gpa.at/projekt/';
const data = [];

// Hauptfunktion zum Extrahieren von Links und Daten
export default async function extractProjects(url) {
  try {
    // HTTP-Anfrage, um die HTML-Seite zu erhalten
    const response = await fetch(url);
    const html = await response.text(); //gesamtes HTML der Seite
    const $ = cheerio.load(html); // Cheerio verwenden zum Parsen der HTML-Seite

    const promises = [];

    // Elemente aus dem HTML selektieren
    // $=Cheerio-Object: Alle die mit <a[href] + baseURL beginnen
    $('a[href^="' + baseURL + '"]').each(async (index, element) => {
      const link = $(element);
      const href = link.attr('href');
      // ==> dataProject() returned gescrapte Daten von der 'Projekt-Seite'
      const promise = dataProject(href).then((scrapedObject) => {
        const {
          name,
          type,
          description,
          constructionAssociation,
          moveIn,
          address,
          image,
        } = scrapedObject;

        const result = {
          name,
          type,
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

      promises.push(promise);
    });

    // Warten bis alle Promises aufgelöst sind
    await Promise.all(promises);

    // Alle Daten sind jetzt in der 'data'-Variable gesammel
    // console.log('data in scraper.js:', data);

    return data; // Rückgabe der gesammelten Projekte
  } catch (error) {
    console.log(error);
  }
}
