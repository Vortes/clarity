const getLinks = async () => {
    const result = await chrome.storage.sync.get(null)
    return result
}

// helper function that allows me to extract base domain from links like https://www.baseDomain.com/placeholder/placeholder
const extractBaseDomain = (url) => {
  // Remove the "https://" or "http://" part from the URL
  url = url.replace(/(https?:\/\/)?/, '');

  // Remove "www." if it exists at the beginning of the URL
  url = url.replace(/^(www\.)?/, '');

  // Split the URL by "/" to get an array of parts
  const parts = url.split('/');

  // The base domain is the first part of the split URL
  const baseDomain = parts[0];

  return baseDomain;
  }

const handleTabActivation = async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const url = tab.url;
    const baseDomain = extractBaseDomain(url)
    const tabId = tab.id
    
    // Check to see if current URL matches any URL in the storage
    const result = await getLinks();

    console.log("https://www."+ baseDomain+"/")

    if (result.hasOwnProperty(baseDomain)) {
      chrome.tabs.sendMessage(tabId, { status: 'validated' });
      return true
    }
}

chrome.tabs.onUpdated.addListener(() => {
    handleTabActivation()
})