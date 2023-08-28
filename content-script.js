chrome.runtime.onMessage.addListener(
    function(request) {
    console.log(request.data)
    }
);