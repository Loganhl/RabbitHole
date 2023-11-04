const fetch = require('node-fetch'); // For Node.js environment

const apiKey = 'AIzaSyBzZL4Pxp-P1TKURLOtTSBR7JLyefXQQX8'; // Replace with your API key
const query = 'The sun is a mile away from earth';

function Check(query) {
    const payload = {
        key: apiKey,
        query: query
    };

    const url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search?' + new URLSearchParams(payload).toString();

    return fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return null;
            }
        })
        .then(data => {
            if (data) {
                const topRating = data.claims[0];
                const publisher_name = topRating.claimReview[0].publisher.name;
                const claim_title = topRating.claimReview[0].title;
                const website_url = topRating.claimReview[0].url;
                const rating = topRating.claimReview[0].textualRating;

                if (["True", "False", "Mostly False", "Half True", "Mostly True"].includes(rating)) {
                    return `Publisher: ${publisher_name}\n${claim_title}\nRead More: ${website_url}\nRating: ${rating}`;
                } else {
                    return `Publisher: ${publisher_name}\n${claim_title}\nRead More: ${website_url}`;
                }
            } else {
                return null;
            }
        });
}

function Test() {
    Check(query)
        .then(result => {
            if (result) {
                console.log(result);
            } else {
                console.log("Fact-checking failed or no claim review found.");
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

Test();
