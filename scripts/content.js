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
      
      // Open the side panel using chrome.sidePanel.open()
      chrome.sidePanel.open({ tabId: tab.id });
    }
  });
  