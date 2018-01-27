(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  var video = null;
  var canvas = null;

  function setup() {


    // function startup(){


    video = document.getElementById('myVid');
    canvas = document.getElementById('canvas');


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

  }

  function takePicture() {
    // if (requestAPI === false) return;

    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      // photo.setAttribute('src', data);

      // var clickMarker=new Date();
      // para.innerHTML= (clickMarker.getTime() - startTime) / 1000 ;
      // para.append(" seconds");

      // passFace(data);
    } else {
      clearPhoto();
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "alert") {
      document.innerHTML = '';

      document.body.innerHTML = (' H <video id="myVid" class="videoFeed" autoplay>Video stream not available.</video><canvas id="canvas"></canvas>');
      setup();
      video.play();
      setTimeout(500, takePicture);

      // alert("second stage reached");
    } else if (message.command === "reset") {
      // removeExistingBeasts();
    }
  });
  // alert("hio");

})();
