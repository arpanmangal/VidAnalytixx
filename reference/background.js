var video = null;

$(document).ready(function() { /* code here */
  // function startup(){
  console.log("hEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
  console.log(document.getElementById('container').innerHTML);


  video = document.getElementById('myVid');


  navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.MediaDevices.getUserMedia);

  navigator.getMedia({
      video: true,
      audio: false
    },
    function(stream) {
      console.log(stream);
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      if (err == 'NotAllowedError: The request is not allowed by the user agent or the platform in the current context.') {
        alert("You need to permit webcam to take video in order to generate the statistics.\n You are advised to refresh if you want to see the statistics.");
      } else {
        alert("Some error occured while taking video from your webcam.");
      }
      console.log("An error occurred! " + err);
    }
  );

  video.addEventListener('canplay', function() {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);

      // Firefox currently has a bug where the height can't be read from
      // the video, so we will make assumptions if this happens.

      if (isNaN(height)) {
        height = width / (4 / 3);
      }
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);
  // }

alert("hey");
});
