(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  var video = null;
  var canvas = null;
  var width = 320;
  var height = 320;
  var dataNote=false;
  var dataNoteGraph=false;

  function setup() {
    video = document.querySelector("#videoElement");
    canvas = document.querySelector("#canvas");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        video: true
      }, handleVideo, videoError);
    }
    function handleVideo(stream) {
      video.src = window.URL.createObjectURL(stream);
    }
    function videoError(e) {     // do something
    }
  }

  function takePic() {
    // document.getElementById("videoElement").style.display = "none";

    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      // photo.setAttribute('src', data);

      // var clickMarker = new Date();
      // para.innerHTML= (clickMarker.getTime() - startTime) / 1000 ;
      // para.append(" seconds");

      passFace(data);
    } else {
      // clearPhoto();
    }

  }

  function openNewWindow(data){
    var output = data;
       var OpenWindow = window.open("child.html", "mywin", '');
       OpenWindow.dataFromParent = output; // dataFromParent is a variable in child.html
       OpenWindow.init();
  }

  function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(dat) {
  var sending = browser.runtime.sendMessage({
    data: dat
  });
  browser.browserAction.openPopup()
  sending.then(handleResponse, handleError);
}

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "startMovie") {
      // document.innerHTML = '';
      mode = 'emotion';
      $("body").prepend('<canvas id="canvas"></canvas>' +
        '<video autoplay="true" id="videoElement">  </video>');
      // document.body.appendChild('<canvas id="canvas"></canvas>' +
      //   '<video autoplay="true" id="videoElement">  </video>');
      // document.body.innerHTML;
      // setup();
      // video.play();
      if(dataNote==false){

      setTimeout(setup, 1000);
      setInterval(takePic, 1500);
      dataNote=true;
    }
      // alert("second stage reached");
    } else if (message.command === "startLecture") {
        // document.innerHTML = '';
        mode = 'lecture'
        $("body").prepend('<canvas id="canvas"></canvas>' +
          '<video autoplay="true" id="videoElement">  </video>');
        // document.body.appendChild('<canvas id="canvas"></canvas>' +
        //   '<video autoplay="true" id="videoElement">  </video>');
        // document.body.innerHTML;
        // setup();
        // video.play();
        if(dataNote==false){

        setTimeout(setup, 1000);
        setInterval(takePic, 1500);
        dataNote=true;
      }
    } else if (message.command === "seeGraph") {
      // pass the data to openNewWindow
      if (dataNoteGraph == false) {
        console.log('seeGraph clicked');
         let dataPie = {
           timestampEmotions: timestampEmotions
         }
        console.log(dataPie);
        // openNewWindow({'a':3});
        notifyBackgroundPage(dataPie)
        dataNoteGraph = true;
      }
    }
    // else if (message.command === "seeGraph") {
    //   // removeExistingBeasts();
    //   console.log("seeGraph clicked");
    //   ytPlayer = document.getElementsByClassName('video-stream')[0];
    //   console.log(ytPlayer.currentTime);
    // }
    else if (message.command === "reset") {
      // removeExistingBeasts();
    }
  });
  // alert("hio");



})();
