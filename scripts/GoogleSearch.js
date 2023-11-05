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

    for (let i = 0; i < Math.min(links.length, titles.length, 6); i++) {
      const title = titles[i].textContent;
      const link = links[i].getAttribute('href');
      results.push([title, link]);
    }

    return results;
  }
}

function updateResults(results) {
  const resultsContainer = document.getElementById('results');

  // Check if the results array is empty
  if (results.length === 0) {
    const noResultsElement = document.createElement('div');
    noResultsElement.innerHTML = `<h3>No related articles!</h3><p>There were no relevant articles found from your selection.</p><hr>`;
    resultsContainer.appendChild(noResultsElement);
  } else {
    const titleElement = document.createElement('div');
    titleElement.innerHTML = `<h3>Top 5 Relevant Articles</h3>`;
    resultsContainer.appendChild(titleElement);

    for (let i = 1; i < results.length; i++) {
      const [title, link] = results[i];

      const titleElement = document.createElement('p');
      titleElement.innerText = `${i}: ${title}`
      resultsContainer.appendChild(titleElement);

      const linkElement = document.createElement('div');
      linkElement.innerHTML = `<a href="${link}" style="color:white;" target="_blank"> - Click here! - </a>`;
      resultsContainer.appendChild(linkElement);

    }
  

    const divider = document.createElement('hr');
    resultsContainer.appendChild(divider);
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
