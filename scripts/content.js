function setupContextMenu() {
    chrome.contextMenus.create({
      id: 'define-word',
      title: 'Define',
      contexts: ['selection']
    });
  }
  
  chrome.runtime.onInstalled.addListener(() => {
    setupContextMenu();
  });
  
  chrome.contextMenus.onClicked.addListener((data, tab) => {
    if (data.menuItemId === 'define-word') {
      // Open the side panel when the "Define" option is clicked.
      chrome.runtime.sendMessage({
        name: 'define-word',
        data: { value: data.selectionText }
      });
      
      const highlightedText = data.selectionText;

        // Send the highlighted text to your Flask server
        fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ highlighted_text: highlightedText }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server, e.g., update the side panel with the result
                document.body.querySelector('#definition-word').innerText = 'Highlighted Text';
                document.body.querySelector('#definition-text').innerText = data.result;
                chrome.sidePanel.open({ tabId: tab.id });
            });
      
      // Open the side panel using chrome.sidePanel.open()
      chrome.sidePanel.open({ tabId: tab.id });
    }
  });
  