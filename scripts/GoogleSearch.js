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

    const links = doc.querySelectorAll('.tF2Cxc a');
    const titles = doc.querySelectorAll('h3');

    for (let i = 0; i < Math.min(links.length, titles.length, 5); i++) {
      const title = titles[i].textContent;
      const link = links[i].getAttribute('href');
      results.push([title, link]);
    }

    return results;
  }
}

function updateResults(results) {
  const resultsContainer = document.getElementById('results');

  resultsContainer.innerHTML = '';

  for (let i = 0; i < results.length; i++) {
    const [title, link] = results[i];

    const resultElement = document.createElement('div');
    resultElement.classList.add('result');

    const titleElement = document.createElement('h3');
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', link);
    linkElement.textContent = title;

    titleElement.appendChild(linkElement);
    resultElement.appendChild(titleElement);

    resultsContainer.appendChild(resultElement);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === 'relevant') {
    const selectedText = message.data;
    getResults(selectedText).then(results => {
      updateResults(results);
    });
  }
});
