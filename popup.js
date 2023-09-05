document.addEventListener("DOMContentLoaded", () => {

    const watchLinksList = document.getElementById("list")
    const button = document.getElementById("getUrl")

  const addLinkToList = async (link) => {
      const li = document.createElement("li")
      li.innerHTML = link
      watchLinksList.appendChild(li)
  }

  const saveLink = (link) => {
      chrome.storage.sync.get(["links"], result => {
      const links = result.links || []
      links.push(link)
      chrome.storage.sync.set({links: links})
      })
  }

  const getLinks = async () => {
    const result = await chrome.storage.sync.get(["links"])
    return result
  }

    // // pre-populate list with existing items from storage
    chrome.storage.sync.get(["links"], result => {
        if (result.links) {
            result.links.forEach((link) => {
                addLinkToList(link)
            })
        }
    })
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.content === "testing") {
          // Send a response back to the content script
          getLinks().then(result => {
            sendResponse({ popupResponse: result.links });
          })
          // Return true to indicate that the response will be sent asynchronously
          return true;
        }
      });

    button.addEventListener("click", async () => {
        const data = document.getElementById("input").value

        addLinkToList(data)
        saveLink(data)

        const allLinks = await chrome.storage.sync.get(null)
    })

});