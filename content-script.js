chrome.runtime.onMessage.addListener((request) => {
        if(request.status === "validated") {
            document.body.classList.add('blacked-out')
        }
    }
);