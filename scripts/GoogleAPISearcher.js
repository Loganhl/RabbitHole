
async function search() {
  // Include the 'request' library for making HTTP requests
  const request = require('request');

  const apiKey = ' AIzaSyD_uJuL89BVGxL6PbjKiinNcJ-hVOPMe_Q ';
  const cx = '637fdff69b5684ae2';

  const query = 'Easter Ruined By Clint Eastwood'; // Replace with your search query

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const searchResults = data.items; // The search results are stored in the 'items' array

      const resultElement = document.getElementById('results');

      searchResults.forEach((result, index) => {
        console.log(`Result ${index + 1}:`);
        console.log(`Title: ${result.title}`);
        console.log(`Link: ${result.link}`);
        console.log('\n');

        const resultnum = document.createElement('div');
        resultnum.innerText = `Result ${index + 1}:`;
        resultElement.appendChild(resultnum);

        const title = document.createElement('div');
        title.innerText = `${result.title}`
        resultElement.appendChild(title);

        const link = document.createElement('div');
        link.innerHTML = `<br><a href="${result.link}" target="_blank">Read More</a>`
        resultElement.appendChild(link);

      });
    } else {
      console.error('Error:', error);
    }
  });
}

search()