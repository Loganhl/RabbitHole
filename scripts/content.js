function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'factcheck',
    title: 'Fact check this information',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'relevant',
    title: 'Find relevant articles',
    contexts: ['selection']
  })
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  if (data.menuItemId === 'factcheck') {
    // Open the side panel using chrome.sidePanel.open()
    chrome.sidePanel.open({ tabId: tab.id });

    // Capture the selected text
    const selectedText = data.selectionText;

    // Send the selected text to your background script
    chrome.runtime.sendMessage({
      name: 'factcheck',
      data: selectedText
      
    });
    
  
  } if (data.menuItemId === 'relevant') {
    // Open the side panel using chrome.sidePanel.open()
    chrome.sidePanel.open({ tabId: tab.id });

    // Capture the selected text
    const selectedText = data.selectionText;

    // Send the selected text to your background script
    chrome.runtime.sendMessage({
      name: 'relevant',
      data: selectedText
      
    });

    chrome.sidePanel.open({ tabId: tab.id });
  }
});