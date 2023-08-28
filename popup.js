document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("getUrl").addEventListener("click", async () => {
        const data = document.getElementById("input").value
        document.getElementById("list").innerHTML = data


        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {data: data});
        console.log(response);
    })
});