document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("getUrl").addEventListener("click", async () => {
        const data = document.getElementById("input").value
        document.getElementById("list").innerHTML = data

        // send tab url & form input
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        await chrome.tabs.sendMessage(tab.id, {data: data});
    })
});