
const fs = require('fs');

const configPath = 'config.json';
let testing = "The sun is a mile away from the earth";

const getConfig = () => {
  const configData = fs.readFileSync(configPath);
  return JSON.parse(configData);
};

const api_key = getConfig().api_key;

async function Check(query) {
  const url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search';

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

        if (rating === "True" || rating === "False" || rating === "Mostly False" || rating === "Half True" || rating === "Mostly True") {
          return `Publisher: ${publisher_name}\n${claim_title}\nRead More: ${website_url}\nRating: ${rating}`;
        } else {
          return `Publisher: ${publisher_name}\n${claim_title}\nRead More: ${website_url}`;
        }
      } catch (error) {
        return 0;
      }
    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
}

async function Test() {
  const result = await Check(testing);
  if (result) {
    console.log(result);
  } else {
    console.log("Fact-checking failed or no claim review found.");
  }
}

Test();
