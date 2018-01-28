// alert("hi");

function listenForClicks() {

  function afterClick(command) {
    function sendToPage(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: command,
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
    // console.log('setting event handler for seeGraph')
    afterClick("seeGraph");
  });

  stopButton.addEventListener("click", (e) => {
    afterClick("stopButton");
  });
}

function reportExecuteScriptError(error) {

}

function handleMessage(request, sender, sendResponse) {
  console.log(request);
  document.getElementById('response').innerHTML = '';
  // // console.log("Message from the content script: " +
  //   request.data);
  // plotPieChart(request.data);
  let neutral = 0,
    comedy = 0,
    emotional = 0,
    horror = 0,
    disgust = 0,
    surprise = 0;

  // // console.log('in plotPieChart')
  for (let i = 0; i < request.data.length; i++) {
    // switch (request.data[i]) {
    //   case 'neutral':
    //     neutral++; break;
    //   case 'happiness':
    //     comedy++; break;
    //   case 'sadness':
    //     emotional++; break;
    //   case 'disgust':
    //     disgust++; break;
    //   case 'fear':
    //     horror++; break;
    //   case 'surprise':
    //     surprise++; break;
      neutral += request.data[i].neutral;
      comedy += request.data[i].happiness;
      emotional += request.data[i].sadness;
      disgust += request.data[i].disgust;
      horror += request.data[i].fear;
      surprise += request.data[i].surprise;
    // }
  }
  var total = neutral + comedy + emotional + disgust + horror + surprise;
  neutral = parseFloat(neutral * 100 / total).toFixed(2);
  comedy =parseFloat( comedy * 100 / total).toFixed(2);
  emotional = parseFloat(emotional * 100 / total).toFixed(2);
  disgust = parseFloat(disgust * 100 / total).toFixed(2);
  horror = parseFloat(horror * 100 / total).toFixed(2);
  surprise = parseFloat(surprise * 100 / total).toFixed(2);

  // parseFloat(Math.round(neutral * 100) / 100).toFixed(2);

  document.getElementById('response').innerHTML+=('<img src="static/emojis/neutral.png" alt="Neutral" height="42" width="42">Neutral:</img>' + neutral
                                                  +'%<br><img src="static/emojis/happy.png" alt="Comedy" height="42" width="42">Comedy:</img>' + comedy
                                                  +'%<br><img src="static/emojis/emotional.png" alt="Emotional" height="42" width="42">Emotional:</img>' + emotional
                                                  +'%<br><img src="static/emojis/fear.png" alt="Horror" height="42" width="42">Horror:</img>' + horror
                                                  +'%<br><img src="static/emojis/disgust.png" alt="Disgust" height="42" width="42">Disgust:</img>' + disgust
                                                  +'%<br><img src="static/emojis/surprised.png" alt="Surprise" height="42" width="42">Surprise:</img>' + surprise+"%");

  sendResponse({ response: "Response from background script" });
}

browser.runtime.onMessage.addListener(handleMessage);



browser.tabs.executeScript({
  file: "static/lib/jquery.min.js"
})
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
  


browser.tabs.executeScript({
  file: "static/js/processFace.js"
})
  .then(listenForClicks)
  .catch(reportExecuteScriptError);

browser.tabs.executeScript({
  file: "static/js/main.js"
})
  .then(listenForClicks)
  .catch(reportExecuteScriptError);

browser.tabs.executeScript({
  file: "browser_script.js"
})
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
