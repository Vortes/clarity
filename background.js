// chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
//     if (message.content === "greetings") {
//       // Send a response back to the content script
//     //   getLinks().then(result => {
//     //     sendResponse({ popupResponse: result.links });
//     //   })
//       // Return true to indicate that the response will be sent asynchronously
//     //   return true;
//         chrome.runtime.sendMessage({ content: "testing" }, response => {
//             console.log(response)
//         });
//     }
//   });

const getLinks = async () => {
    const result = await chrome.storage.sync.get(["links"])
    return result
}

// once a user switches to a new tab, grab that tabs url
chrome.tabs.onActivated.addListener(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true })
    .then(([tab]) => {
        const url = tab.url;
        //check against storage
        console.log('Current tab URL:', url);

        // check to see if current url matches any url in the storage
        getLinks().then(result => {
            const results = result.links
            if(results.includes(url)) {
                console.log("WE FOUND IT!!")
            }
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
})

console.log("I am background script")