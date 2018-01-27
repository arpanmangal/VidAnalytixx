(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts();
    // let beastImage = document.createElement("img");
    // beastImage.setAttribute("src", beastURL);
    // beastImage.style.height = "100vh";
    // beastImage.className = "beastify-image";
    // document.body.appendChild(beastImage);
    document.body.appendChild('  <video id="myVid" class="videoFeed">Video stream not available.</video>');
    var video = null;


    // function startup(){


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

  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });

})();
