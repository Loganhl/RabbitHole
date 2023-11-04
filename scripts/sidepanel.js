let query = '';

chrome.runtime.onMessage.addListener(({ name, data }) => {
    if (name === 'define-word') {
        // Hide instructions.
        document.getElementById('select-a-word').style.display = 'none';

        // Show word.
        document.getElementById('selection').innerText = data.value;

        // Call the Check function and update the side panel text when the API response is received.
        Check(data.value).then(resultString => {
            document.getElementById('definition-text').innerText = resultString;
        });

        query = data.value;
    }
});
