const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeGoogleNews(query) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);

    const results = [];

    $('h3').each((index, element) => {
      const title = $(element).text();
      const url = $(element).parent().attr('href');
      results.push({ title, url });
    });

    return results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

const searchQuery = 'Your search query here';
scrapeGoogleNews(searchQuery)
  .then((results) => {
    console.log('Search Results:');
    results.forEach((result, index) => {
      console.log(`[${index + 1}] ${result.title}`);
      console.log(result.url);
      console.log('-----');
    });
  });