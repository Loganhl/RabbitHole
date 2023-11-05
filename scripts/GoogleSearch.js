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
  const resultElement = document.getElementById('results');
  const listElement = document.createElement('div');

  const titleElement = document.createElement('h3');
  titleElement.innerText = 'Top 5 Relevant Articles';
  listElement.appendChild(titleElement);

  results.forEach(result => {
    const linkElement = document.createElement('a');
    linkElement.textContent = result[0];
    linkElement.href = result[1];
    linkElement.target = '_blank';
    linkElement.style.color = 'white';

    const linkDiv = document.createElement('div');
    linkDiv.style.marginBottom = '10px';
    linkDiv.appendChild(linkElement);
    listElement.appendChild(linkDiv);
  });

  const hrElement = document.createElement('hr');
  listElement.appendChild(hrElement);

  resultElement.insertBefore(listElement, resultElement.firstChild);
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === 'relevant') {
    const selectedText = message.data;
    getResults(selectedText).then(results => {
      updateResultsInHTML(results);
    });
  }
});
