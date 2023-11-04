var unirest = require('unirest'); // Remove this line
var cheerio = require('cheerio'); // Remove this line

async function getResults(query) {
  // You don't need 'require' for browser-based HTTP requests
  const response = await fetch('https://www.google.com/search?q=' + query, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    },
  });

  if (response.ok) {
    const html = await response.text();
    const $ = cheerio.load(html);

    let titles = [];
    let links = [];

    $(".g .yuRUbf h3").each((i, el) => {
      titles[i] = $(el).text();
    });
    $(".yuRUbf a").each((i, el) => {
      links[i] = $(el).attr("href");
    });

    const results = [];

    for (let i = 0; i < titles.length; i++) {
      results[i] = [titles[i], links[i]];
    }

    return results
  }
}

// GoogleSearch.js

// Function to update the HTML with search results
function updateResults(results) {
  const resultsContainer = document.getElementById('results');

  // Clear any existing content in the results div
  resultsContainer.innerHTML = '';

  // Iterate through the top 5 results
  for (let i = 0; i < 5 && i < results.length; i++) {
    const [title, link] = results[i];

    // Create a new result element
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');

    // Create a title element and a link element
    const titleElement = document.createElement('h3');
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', link);
    linkElement.textContent = title;

    // Append the title and link to the result element
    titleElement.appendChild(linkElement);
    resultElement.appendChild(titleElement);

    // Append the result element to the results container
    resultsContainer.appendChild(resultElement);
  }
}



chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.name === 'relevant') {
    const selectedText = message.data;

    // Define the query based on the selected text
    const query = selectedText;

    try {
      const results = await getResults(query);
      updateResults(results);
    } catch (error) {
      console.error(error);
    }
  }
});