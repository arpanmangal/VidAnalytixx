function getMeta() {
    //returns a promise to return topic and pageNum
    //if(mode=='video') {
    console.log('in getMeta');
    try{
    var ytPlayer = document.getElementsByClassName('video-stream')[0];
    return new Promise((resolve, reject) => {
      resolve({timestamp: ytPlayer.currentTime});
    });
    }
    catch(err){
      return new Promise((resolve, reject) => {
      resolve({timestamp: 1});
    });
    }
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

        if (mode == 'emotion') {
            console.log('emotion mode')
            let Emotions = getEmotionData(obj);
            console.log('its ok ->')
            console.log(Emotions)
            timestamps.push(Emotions.timestamp);
            description.push(Emotions.description);
            console.log('first')
            Emotions1 = Emotions.details.emotion;
            console.log('good')
            neutral.push(Emotions1.neutral);
            comedy.push(Emotions1.happiness);
            horror.push(Emotions1.sadness);
            disgust.push(Emotions1.disgust);
            console.log('fine')
            emotional.push(Emotions1.sadness);
            surprise.push(Emotions1.surprise);

            let max = 'neutral';
            console.log('well')
            for(var key in Emotions1) {
                if (Emotions1[key] > Emotions1[max]) max = key;
            }

            console.log('hi')
            timestampEmotions.push(max);
            console.log(timestampEmotions);
        }
        else if (mode == 'lecture') getAttentionData(obj);
        else {
            alert('no mode among the two');
        }
      });
    });
  }