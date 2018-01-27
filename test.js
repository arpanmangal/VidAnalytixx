// alert("hi");

function listenForClicks() {

  function afterClick(command) {
    function sendToPage(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: command,
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
  }


  let startMovie = document.getElementById('startMovie');
  let startLecture = document.getElementById('startLecture');
  let seeGraph = document.getElementById('seeGraph');
  let stopButton = document.getElementById('stopButton');
  
  // Event Listeners
  startMovie.addEventListener("click", (e) => {
    afterClick("startMovie");
  });

  startLecture.addEventListener("click", (e) => {
    afterClick("startLecture");
  });

  seeGraph.addEventListener("click", (e) => {
    afterClick("seeGraph");
  });

  stopButton.addEventListener("click", (e) => {
    afterClick("stopButton");
  });
}

function reportExecuteScriptError(error) {

}


browser.tabs.executeScript({
    file: "browser_script.js"
  })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
