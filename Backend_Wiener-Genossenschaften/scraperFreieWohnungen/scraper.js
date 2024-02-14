import * as cheerio from 'cheerio';
import dataWohnung from './dataWohnung.js';

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
    // console.log('data in scraper.js für Flats:', data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
