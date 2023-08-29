chrome.runtime.onMessage.addListener(request => {
    const links = request.data.links
    if(links.includes(request.tabURL)) {
        console.log("true")
        document.body.classList.add('blacked-out')
        }
    }
);