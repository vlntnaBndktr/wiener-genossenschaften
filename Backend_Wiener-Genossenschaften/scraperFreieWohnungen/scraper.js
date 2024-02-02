import * as fs from 'node:fs';
import * as cheerio from 'cheerio';
import dataWohnung from './dataWohnung.js';
import { Project } from '../models/projects.js';

const URL = 'https://www.wbv-gpa.at/wohnungen/';
const baseURL = 'https://www.wbv-gpa.at/wohnung/';
const data = [];

export default async function extractFlats(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const links = $('a[href^="' + baseURL + '"]')
      .map((index, element) => $(element).attr('href'))
      .get();

    const promises = links.map(async (href) => {
      try {
        const object = await dataWohnung(href);

        const result = {
          name: object.name,
          type: object.type,
          description: object.description,
          constructionAssociation: object.constructionAssociation,
          moveIn: object.moveIn,
          location: {
            street: object.address,
          },
          image: object.image,
          squareMeters: object.squareMeters,
          website: href,
        };

        data.push(result);
      } catch (error) {
        console.error('Error processing dataWohnung:', error);
      }
    });

    await Promise.all(promises);

    // const jsonString = JSON.stringify(data, null, 2);
    // fs.writeFileSync('wohnungen.json', jsonString);

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

    console.log('Files created successfully.');
  } catch (error) {
    console.log(error);
  }
}
