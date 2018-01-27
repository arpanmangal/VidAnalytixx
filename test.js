// alert("hi");

function listenForClicks() {



  document.addEventListener("click", (e) => {

    function sendToPage(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "alert",
        beastURL: "none"
      });
    }

    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    browser.tabs.query({
        active: true,
        currentWindow: true
      })
      .then(sendToPage)
      .catch(reportError);
  });
}

function reportExecuteScriptError(error) {

}


browser.tabs.executeScript({
    file: "browser_script.js"
  })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
