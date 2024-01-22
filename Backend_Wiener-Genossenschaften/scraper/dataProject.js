import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function dataProject(href) {
  // HTTP-Anfrage, um die HTML-Seite der Projektseite zu erhalten
  const response = await axios.get(href);
  const html = response.data;
  const $ = cheerio.load(html);

  // Variablen erstellen für die extrahierten Infos
  let imageProject = '';
  let descriptionProject = '';
  let nameProject = '';
  let addressProject = '';

  const figureElement = $('figure');
  const imgElement = $(figureElement).find('img');

  const section = $('section > div');
  const pElement = $(section).find('p');

  const h2 = $('h2');

  const article = $('article > span');

  imageProject = imgElement.attr('data-src');
  descriptionProject = pElement.text().trim();
  nameProject = h2.text().trim();
  addressProject = $(article).text().trim();

  return { imageProject, descriptionProject, nameProject, addressProject };
}
