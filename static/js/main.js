timestampEmotions=[];

function getT(){
    console.log(timestampEmotions);
    return timestampEmotions;
}
function getMeta() {
    //returns a promise to return topic and pageNum
    //if(mode=='video') {
    // // console.log('in getMeta');
    if(document.domain.indexOf('youtube')===-1){
      return new Promise((resolve, reject) => {
        resolve({timestamp: 1});
      });
    }
    var ytPlayer = document.getElementsByClassName('video-stream')[0];
    //   // console.log('not youtube');
      
    
    return new Promise((resolve, reject) => {
      resolve({timestamp: ytPlayer.currentTime});
    });
    }
    
    
    //}
    // return pdfDoc.getPage(pageNum).then(function(page) {
    //     return page.getTextContent().then(function(textContent) {
    //         //alert( "Topic: "+textContent.items[0].str+", Page: "+ String(pageNum))
    //         return {topic: textContent.items[0].str, page: String(pageNum)};
    //     });
    // });
  

  function passFace(file,caller) {
    // alert('in passFace')';
    // // console.log('in passFace')
    //var image=makeblob(file);
    // var image = new Image();
    // image.id = "pic";
    // image.src = file;
    // // console.log(image);
    getMeta().then(function (metaData) {
    //   // console.log('out of get meta')
      if (metaData == undefined) {
        metaData.page = 'Undefined';
        metaData.topic = 'Undefined';
        // // console.log("Not OK");
      }
      else {
        // // console.log("OK");
      }
      // if (mode == 'pdf') description = "Slide " + metaData.page + " (" + metaData.topic + ") ";
      description = metaData.timestamp;
      // console.log(description);
      
      // console.log('calling processFace')
      processFaces(file, description, 'des'/*description*/, function (obj) {
        // console.log(obj);

        if (mode == 'emotion') {
            // console.log('emotion mode')
            var Emotions = getEmotionData(obj);
            // // console.log('its ok ->')
            // console.log(Emotions)
            // timestamps.push(Emotions.timestamp);
            // description.push(Emotions.description);
            // // console.log('first')
            Emotions1 = Emotions.details.emotion;
            // console.log(Emotions1);
            // neutral.push(Emotions1.neutral);
            // comedy.push(Emotions1.happiness);
            // horror.push(Emotions1.sadness);
            // disgust.push(Emotions1.disgust);
            // // console.log('fine')
            // emotional.push(Emotions1.sadness);
            // surprise.push(Emotions1.surprise);

            // var max = 'neutral';
            // // // console.log('well')
            // for(var key in Emotions1) {
            //     if (Emotions1[key] > Emotions1[max]) max = key;
            // }

            // // console.log('hi')
            // console.log(max);
            timestampEmotions.push(Emotions1);
            console.log(timestampEmotions);
            caller(timestampEmotions);
            return timestampEmotions;
        }
        else if (mode == 'lecture') getAttentionData(obj);
        else {
            // alert('no mode among the two');
        }
      });
    });
  }