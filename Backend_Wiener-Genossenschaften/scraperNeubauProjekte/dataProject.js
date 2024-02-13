import * as cheerio from 'cheerio';

// Arbeitet innerhalb des href-Links zu einem bestimmten Projekt (zB: https://www.wbv-gpa.at/projekt/puchsbaumgasse-1/)
export default async function dataProject(href) {
  const response = await fetch(href);
  const html = await response.text();
  const $ = cheerio.load(html);

  // Variablen erstellen für die extrahierten Infos
  let name = '';
  let type = 'NP';
  let description = '';
  let constructionAssociation = 'WBV-GPA';
  let moveIn = 'Fertigstellung 2025';
  let address = '';
  let image = '';

  const figureElement = $('figure');
  const imgElement = $(figureElement).find('img');

  const section = $('section > div');
  const pElement = $(section).find('p');

  const h2 = $('h2');

  const article = $('article > span');

  name = h2.text().trim();
  description = pElement.text().trim();
  address = $(article).text().trim();
  image = imgElement.attr('data-src');

  return {
    name,
    type,
    description,
    address,
    image,
    constructionAssociation,
    moveIn,
  };
}
