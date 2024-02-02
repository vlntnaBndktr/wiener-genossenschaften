import * as cheerio from 'cheerio';

export default async function dataWohnung(href) {
  const response = await fetch(href);
  const html = await response.text();
  const $ = cheerio.load(html);

  let name = '';
  let type = 'FW';
  let description = '';
  let constructionAssociation = 'WBV-GPA';
  let moveIn = 'sofort';
  let address = '';
  let image = '';
  let squareMeters = '';

  const figureElement = $('figure');
  const imgElement = $(figureElement).find('img');

  const section = $('section > div');
  const pElement = $(section).find('p');

  const h2 = $('h2');

  const h1 = $('div > h1');

  const strongElement = $('div > strong');
  const textElement = $(strongElement[1]).text().trim();

  image = imgElement.attr('data-src');
  description = pElement.text().trim();
  name = h1.text().trim();
  address = $(h2).text().trim();
  squareMeters = textElement;

  return {
    name,
    type,
    description,
    constructionAssociation,
    moveIn,
    address,
    image,
    squareMeters,
  };
}
