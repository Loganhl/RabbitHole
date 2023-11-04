function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'define-word',
    title: 'RabbitHole',
    contexts: ['selection']
  });
}

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
