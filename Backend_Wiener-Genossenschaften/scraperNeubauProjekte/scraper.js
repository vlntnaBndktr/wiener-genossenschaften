import * as fs from 'node:fs';
import * as cheerio from 'cheerio';
import dataProject from './dataProject.js';
import { Project } from '../models/projects.js';

const URL = 'https://www.wbv-gpa.at/wohnungen/neue-projekte/';
const baseURL = 'https://www.wbv-gpa.at/projekt/';
const data = [];

export default async function extractProjects(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const promises = [];

    $('a[href^="' + baseURL + '"]').each(async (index, element) => {
      const link = $(element);
      const href = link.attr('href');

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

    await Promise.all(promises);

    // const jsonString = JSON.stringify(data, null, 2);
    // fs.writeFileSync('projects2.json', jsonString);

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

    console.log('File created successfully.');
  } catch (error) {
    console.log(error);
  }
}
