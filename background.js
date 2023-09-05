const getLinks = async () => {
    const result = await chrome.storage.sync.get(["links"])
    return result.links
}

const handleTabActivation = async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const url = tab.url;
    const tabId = tab.id
    
    console.log('Current tab URL:', url);
  
    // Check to see if current URL matches any URL in the storage
    const result = await getLinks();
    console.log(result.includes(url))
  
    // If it matches, send a message to the tab
    if (result.includes(url)) {
      chrome.tabs.sendMessage(tabId, { status: 'validated' });
      return true
    }
}

chrome.tabs.onUpdated.addListener(() => {
    handleTabActivation()
})