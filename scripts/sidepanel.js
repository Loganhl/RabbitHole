
const apiKey = 'AIzaSyBzZL4Pxp-P1TKURLOtTSBR7JLyefXQQX8'; // Replace with your API key

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

                let resultString = '';

                if (["True", "False", "Mostly False", "Half True", "Mostly True"].includes(rating)) {
                    resultString =  `Publisher: ${publisher_name}\n${claim_title}\nRead More: ${website_url}\nRating: ${rating}`;
                } else {
                    resultString = `Publisher: ${publisher_name}\n${claim_title}\nRead More: ${website_url}`;
                }

                return resultString;

            } else {
                return null;
            }
        });
}

chrome.runtime.onMessage.addListener(({ name, data }) => {
    if (name === 'define-word') {

        // Show word.
        document.getElementById('selection').innerText = data.value;

        let query = data.value

        // Call the Check function and update the side panel text when the API response is received.
        Check(query).then(resultString => {
            document.getElementById('definition-text').innerText = resultString;
        });
    }
});
