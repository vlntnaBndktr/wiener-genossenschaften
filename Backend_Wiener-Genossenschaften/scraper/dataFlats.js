import axios from 'axios';
import * as cheerio from 'cheerio';

// Arbeitet innerhalb des href-Links zu einem bestimmten Projekt (zB: https://www.wbv-gpa.at/wohnung/8053-graz-fruehlingstrasse-33-2-eg-5/)
export default async function dataFlats(href) {
  // HTTP-Anfrage, um die HTML-Seite der Projektseite zu erhalten
  const response = await axios.get(href);
  const html = response.data;
  const $ = cheerio.load(html);

  // Variablen erstellen für die extrahierten Infos
  let name = '';
  let description = '';
  let constructionAssociation = 'WBV-GPA';
  let moveIn = '';
  let address = '';
  let image = '';

  const figureElement = $('figure');
  const imgElement = $(figureElement).find('img');

  const section = $('section > div');
  const pElement = $(section).find('p');

  const h2 = $('h2');

  const article = $('article > span');

  image = imgElement.attr('data-src');
  description = pElement.text().trim();
  name = h2.text().trim();
  address = $(article).text().trim();

  return { name, description, constructionAssociation, moveIn, address, image };
}
