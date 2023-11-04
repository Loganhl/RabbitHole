

// Include the 'request' library for making HTTP requests
const request = require('request');

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const cx = 'YOUR_CUSTOM_SEARCH_ENGINE_ID'; // Replace with your actual Custom Search Engine ID
const query = 'Easter Ruined By Clint Eastwood'; // Replace with your search query

const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

request(url, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const data = JSON.parse(body);
    const searchResults = data.items; // The search results are stored in the 'items' array

    searchResults.forEach((result, index) => {
      console.log(`Result ${index + 1}:`);
      console.log(`Title: ${result.title}`);
      console.log(`Link: ${result.link}`);
      console.log('\n');
    });
  } else {
    console.error('Error:', error);
  }
});