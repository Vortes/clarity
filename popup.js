document.addEventListener("DOMContentLoaded", () => {

    const watchLinksList = document.getElementById("list")
    const button = document.getElementById("getUrl")

    // pre-populate list with existing items from storage
    chrome.storage.sync.get(["links"], result => {
        if (result.links) {
            result.links.forEach((link) => {
                addLinkToList(link)
            })
        }
    })

    button.addEventListener("click", async () => {
        const data = document.getElementById("input").value

        addLinkToList(data)
        saveLink(data)

        const allLinks = await chrome.storage.sync.get(null)
        console.log(allLinks)

        // send tab url & form input
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        await chrome.tabs.sendMessage(tab.id, {data: allLinks, tabURL: tab.url});
    })

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

});