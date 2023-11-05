async function Check(query) {
  const url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search';
  const api_key = 'AIzaSyBzZL4Pxp-P1TKURLOtTSBR7JLyefXQQX8';

  const params = new URLSearchParams({
    key: api_key,
    query: query,
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (response.status === 200) {
      const result = await response.json();
      const resultElement = document.getElementById('results');

      if (result.claims && result.claims.length > 0) {
        const topRating = result.claims[0];
        const publisher_name = topRating.claimReview[0].publisher.name;
        const claim_title = topRating.claimReview[0].title;
        const website_url = topRating.claimReview[0].url;
        const rating = topRating.claimReview[0].textualRating;

        if (
          rating === "True" ||
          rating === "False" ||
          rating === "Mostly False" ||
          rating === "Half True" ||
          rating === "Mostly True"
        ) {
          const ratingElement = document.createElement('div');
          ratingElement.innerHTML = `<h3>${rating} according to ${publisher_name}</h3>`;
          resultElement.appendChild(ratingElement);

          const titleElement = document.createElement('div');
          titleElement.innerText = `${claim_title}`;
          resultElement.appendChild(titleElement);

          const urlElement = document.createElement('div');
          urlElement.innerHTML = `<br><a href="${website_url}" style="color:white;" target="_blank">Read More</a><hr></hr>`;
          resultElement.appendChild(urlElement);
        } else {
          const publisherElement = document.createElement('div');
          publisherElement.innerHTML = `<h3>Publisher: ${publisher_name}</h3>`;
          resultElement.appendChild(publisherElement);

          const titleElement = document.createElement('div');
          titleElement.innerText = `${claim_title}`;
          resultElement.appendChild(titleElement);

          const urlElement = document.createElement('div');
          urlElement.innerHTML = `<br><a href="${website_url}" style="color:white;" target="_blank">Read More</a><hr></hr>`;
          resultElement.appendChild(urlElement);
        }
      } else {
        const notInDatabaseElement = document.createElement('div');
        notInDatabaseElement.innerHTML = `<h3>Fact check not in database!</h3><p>This claim has not been factchecked by Google FachtCheckAPI.</p><hr></hr>`;
        resultElement.appendChild(notInDatabaseElement);
      }
    } else {
      const notInDatabaseElement = document.createElement('div');
      notInDatabaseElement.innerHTML = `<h3>HTTP Error!</h3><hr></hr>`;
      resultElement.appendChild(notInDatabaseElement);
    }
  } catch (error) {
    const notInDatabaseElement = document.createElement('div');
    notInDatabaseElement.innerHTML = `<h3>Error Fetching Data!</h3><hr></hr>`;
    resultElement.appendChild(notInDatabaseElement);
  }
}

// Listen for selected text from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === 'factcheck') {
    const selectedText = message.data;
    Check(selectedText);
  }
});
