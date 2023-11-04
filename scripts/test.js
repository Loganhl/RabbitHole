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

      try {
        const topRating = result.claims[0];
        const publisher_name = topRating.claimReview[0].publisher.name;
        const claim_title = topRating.claimReview[0].title;
        const website_url = topRating.claimReview[0].url;
        const rating = topRating.claimReview[0].textualRating;

        const resultElement = document.getElementById('factCheckResult');
        if (
          rating === "True" ||
          rating === "False" ||
          rating === "Mostly False" ||
          rating === "Half True" ||
          rating === "Mostly True"
        ) {
          resultElement.innerText = `Publisher : ${publisher_name}\nRating : ${rating}\n${claim_title}\nRead More : ${website_url}\n`;
        } else {
          resultElement.innerText = `Publisher : ${publisher_name}\n${claim_title}\nRead More : ${website_url}`;
        }
      } catch (error) {
        document.getElementById('factCheckResult').innerText = "Fact check not in database!";
      }
    } else {
      document.getElementById('factCheckResult').innerText = "HTTP request failed.";
    }
  } catch (error) {
    document.getElementById('factCheckResult').innerText = "Error fetching data.";
  }
}

// Listen for selected text from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name === 'selected-text') {
    const selectedText = message.data;
    Check(selectedText);
  }
});
