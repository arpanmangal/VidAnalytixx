function getMeta() {
    //returns a promise to return topic and pageNum
    //if(mode=='video') {
    console.log('in getMeta');
    var ytPlayer = document.getElementsByClassName('video-stream')[0];
    return new Promise((resolve, reject) => {
      resolve({timestamp: ytPlayer.currentTime});
    });
    //}
    // return pdfDoc.getPage(pageNum).then(function(page) {
    //     return page.getTextContent().then(function(textContent) {
    //         //alert( "Topic: "+textContent.items[0].str+", Page: "+ String(pageNum))
    //         return {topic: textContent.items[0].str, page: String(pageNum)};
    //     });
    // });
  }

  function passFace(file) {
    // alert('in passFace')';
    console.log('in passFace')
    //var image=makeblob(file);
    // var image = new Image();
    // image.id = "pic";
    // image.src = file;
    // console.log(image);
    getMeta().then(function (metaData) {
      console.log('out of get meta')
      if (metaData == undefined) {
        metaData.page = 'Undefined';
        metaData.topic = 'Undefined';
        // console.log("Not OK");
      }
      else {
        // console.log("OK");
      }
      // if (mode == 'pdf') description = "Slide " + metaData.page + " (" + metaData.topic + ") ";
      description = metaData.timestamp;
      console.log(description);
      
      console.log('calling processFace')
      processFaces(file, 4/*getTimeStamp()*/, 'des'/*description*/, function (obj) {
        console.log(obj);

        if (data == null || data.length == 0); // do nothing;
        else {
        }
      });
    });
  }