chrome.runtime.onMessage.addListener((request) => {
  if (request.status === "validated") {
    document.body.classList.add("blacked-out");
    const formHTML = `
        <form class="z-[600] flex flex-col">
            <input placeholder="Reason for accessing this site" type="text" id="name" name="name"><br><br>
            <button class="">Submit</button>
        </form>`;
    document.body.innerHTML = formHTML;
  }
});
