async function getResults(query) {
  const response = await fetch('https://www.google.com/search?q=' + query, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    },
  });

  if (response.ok) {
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const results = [];

    const searchResults = doc.querySelectorAll('.g');

    for (let i = 0; i < Math.min(searchResults.length, 6); i++) {
      const titleElement = searchResults[i].querySelector('h3');
      const linkElement = searchResults[i].querySelector('a');

      if (titleElement && linkElement) {
        const title = titleElement.textContent;
        const link = linkElement.href;

        if (!title.includes('Description')) {
          results.push([title, link]);
        }
      }
    }

    return results;
  }
}

function updateResultsInHTML(results) {
  const resultsContainer = document.getElementById('results');

 
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const resultElement = document.createElement('a');
    resultElement.textContent = result[0];
    resultElement.href = result[1];
    resultElement.target = '_blank';
    resultsContainer.appendChild(resultElement);

    resultsContainer.appendChild(document.createElement('br'));
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === 'relevant') {
    const selectedText = message.data;
    getResults(selectedText).then(results => {
      updateResultsInHTML(results);
    });
  }
});
