

console.log('Valis Web Scraper');

// index.js

const cheerio = require("cheerio");
const axios = require("axios");

async function performScraping() {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://brightdata.com/",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    });

    // parsing the HTML source of the target web page with Cheerio
    const $ = cheerio.load(axiosResponse.data);

    // initializing the data structures
    // that will contain the scraped data
    const industries = [];

    // scraping the image boxes in the "Use Cases" section
    $(".elementor-widget-image-box").each((index, element) => {
        // extracting the data of interest
        const pageUrl = $(element).find("a").attr("href");
        const image = $(element).find(".elementor-image-box-img img").attr("data-lazy-src");
        const name = $(element).find(".elementor-image-box-title").text().trim();

        // filtering out not interesting data
        if (name && pageUrl && image) {
            // converting the data extracted into a more
            // readable object
            const industry = {
                url: pageUrl,
                image: image,
                name: name
            }

            // adding the object containing the scraped data
            // to the industries array
            industries.push(industry)
        }
    });

    // transforming the scraped data into a general object
    const scrapedData = {
        industries: industries,
    };

    // converting the scraped data object to JSON
    const scrapedDataJSON = JSON.stringify(scrapedData);

    // storing scrapedDataJSON in a database via an API call...

    console.log(scrapedDataJSON);
}

performScraping();

