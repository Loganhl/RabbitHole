function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'define-word',
    title: 'RabbitHole',
    contexts: ['selection']
  });
}

<<<<<<< HEAD
chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  if (data.menuItemId === 'define-word') {
    // Capture the selected text
    const selectedText = data.selectionText;

    // Send the selected text to your background script
    chrome.runtime.sendMessage({
      name: 'selected-text',
      data: selectedText
    });

    // Open the side panel using chrome.sidePanel.open()
    chrome.sidePanel.open({ tabId: tab.id });
  }
});
=======
      let selection = data.selctionText;
      console.log(selection)

      
      // Open the side panel using chrome.sidePanel.open()
      chrome.sidePanel.open({ tabId: tab.id });
    }
  });
>>>>>>> a435c57a79183a78f04c116395a8b32b90cd293f
