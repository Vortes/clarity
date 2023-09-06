document.addEventListener("DOMContentLoaded", () => {

    const watchLinksList = document.getElementById("list")
    const button = document.getElementById("getUrl")

  const AppendInput = async (link) => {
      const li = document.createElement("li")
      li.innerHTML = link
      watchLinksList.appendChild(li)
  }

  const saveInputToStorage = async (link) => {
      const results = await getInputs()
      const links = results.links || []
      links.push(link)
      chrome.storage.sync.set({links: links})
  }

  const getInputs = async () => {
    const result = await chrome.storage.sync.get(["links"])
    return result
  }

    // // pre-populate list with existing items from storage
    chrome.storage.sync.get(["links"], result => {
        if (result.links) {
            result.links.forEach((link) => {
                AppendInput(link)
            })
        }
    })
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.content === "testing") {
          // Send a response back to the content script
          getInputs().then(result => {
            sendResponse({ popupResponse: result.links });
          })
          // Return true to indicate that the response will be sent asynchronously
          return true;
        }
      });

    button.addEventListener("click", async () => {
        const data = document.getElementById("input").value

        AppendInput(data)
        saveInputToStorage(data)

    })

});