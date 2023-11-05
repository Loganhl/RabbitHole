const https = require('https');

async function search() {
  // Include the 'request' library for making HTTP requests
  const request = require('request');

  const apiKey = ' AIzaSyD_uJuL89BVGxL6PbjKiinNcJ-hVOPMe_Q ';
  const cx = '637fdff69b5684ae2';
  const query = 'Easter Ruined By Clint Eastwood'; // Replace with your search query

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const result = JSON.parse(data);
        const searchResults = result.items; // The search results are stored in the 'items' array

        const resultElement = document.getElementById('results');

        searchResults.forEach((result, index) => {
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

        // Append the search results to the "bubble" element
        const bubbleElement = document.querySelector('.bubble');
        bubbleElement.appendChild(resultElement);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }).on('error', (error) => {
    console.error('Error:', error);
  });
}

search();