(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  var video = null;
  var canvas = null;

  function setup() {
    video = document.querySelector("#videoElement");
     
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
     
    if (navigator.getUserMedia) {      
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }
     
    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }
     
    function videoError(e) {
        // do something
    }
}

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "alert") {
      // document.innerHTML = '';

      document.documentElement.innerHTML = ('<video autoplay="true" id="videoElement">  </video>');
      // setup();
      // video.play();
      setTimeout(setup,1000);

      // alert("second stage reached");
    } else if (message.command === "reset") {
      // removeExistingBeasts();
    }
  });
  // alert("hio");

})();
