// chrome.runtime.onMessage.addListener(request => {
//     const links = request.data.links
//     if(links.includes(request.tabURL)) {
//         console.log("true")
//         document.body.classList.add('blacked-out')
//         }
//     }
// );

// alert(window.location)

// chrome.runtime.sendMessage({ content: "greetings" }, response => {
//     // if(response.popupResponse.includes(window.location)) {
//     //     console.log("HOLY SHIT IT WORKED")
//     // }
//     // const links = response.popupResponse
//     // if(links.includes(window.location.href)){
//     //     document.body.classList.add('blacked-out')
//     // }
//     console.log(response)
// });