document.addEventListener("DOMContentLoaded", () => {

    const userInputList = document.getElementById("list")
    const button = document.getElementById("getUrl")

  const AppendInput = async (link) => {
      const li = document.createElement("li")
      const styling = ["flex", "justify-between", "bg-[#edeff1]", "py-2", "px-4", "rounded-md", "mb-2"]
      li.classList.add(...styling)
      li.innerHTML += `<p>${link}</p>`
      li.innerHTML += `<button class="delete-input-button">${"\u00D7"}</button>`
      
      // Add click event to delete button
      const deleteInputButton = li.querySelector('.delete-input-button')
      deleteInputButton.addEventListener('click', async()=> {
        chrome.storage.sync.remove([link])
        li.remove()
      })
      userInputList.appendChild(li)
  }

  const saveInputToStorage = async (link) => {
      // const results = await getInputs()
      // const links = results.links || []
      // links.push(link)
      chrome.storage.sync.set({[link]: link})

  }

  const getInputs = async () => {
    const result = await chrome.storage.sync.get(null)
    return result
  }

    // pre-populate list with existing items from storage
    chrome.storage.sync.get(null, result => {
        if (result) {
          for(const input in result) {
            AppendInput(input)
          }
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