import * as fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Importieren der Funktion dataProject
import dataFlats from './dataFlats.js';
import { Flat } from '../models/flats.js';

const URL = 'https://www.wbv-gpa.at/wohnungen/';

// Array zum Speichern der extrahierten Daten
const data = [];

// Konstanten für die Basis-URL der 'Übersichtsseite'
const baseURL = 'https://www.wbv-gpa.at/wohnung/';

// Hauptfunktion zum Extrahieren von Links und Daten
export default async function extractFlatLinks(URL) {
  try {
    // HTTP-Anfrage, um die HTML-Seite zu erhalten
    const response = await axios.get(URL);
    const html = response.data;

    // Cheerio verwenden zum Parsen der HTML-Seite
    const $ = cheerio.load(html);

    // Array zum Speichern der extrahierten Links
    const links = [];

    // Elemente aus dem HTML selektieren
    $('.objects__list__rows__item__info__cell--link a').each(
      (index, element) => {
        const link = $(element);
        const href = link.attr('href');

        // // Überprüfen, ob das Nachbar-Element eine Wiener Postleitzahl enthält
        // const div = link

        // // console.log('Links:', href);
        // console.log('Postal Code', postalCode);

        links.push(href);
      }
    );

    const postalCode = [];

    $('.objects__list__rows__item__info').each((index, element) => {
      const div = cheerio.load(element);
      const text = div('div:first-child > span:first-child').text().trim();

      console.log('First Span Text: ', text);
    });

    console.log('Gefundene Links mit Wiener Postleitzahl:', links);
    return links;

    console.log('Alle Daten erfolgreich in DB gespeichert');
  } catch (error) {
    console.error('Ein Fehler ist aufgetreten:', error);
  }
}

await extractFlatLinks(URL);
