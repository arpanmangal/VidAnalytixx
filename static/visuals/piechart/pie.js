function plotPieChart(timestampEmotion) {
    /* timestampEmotion is an array consisting neutral etc.*/
    let neutral = 0,
        comedy = 0,
        emotional = 0,
        horror = 0,
        disgust = 0,
        surprise = 0;

    console.log('in plotPieChart')
    for (let i = 0; i < timestampEmotion.length; i++) {
        switch(timestampEmotion[i]) {
            case 'neutral':
                neutral++; break;
            case 'happiness':
                comedy++; break;
            case 'sadness':
                emotional++; break;
            case 'disgust':
                disgust++; break;
            case 'fear':
                horror++; break;
            case 'surprise':
                surprise++; break;
        }
    }

    var data = [{
      values: [comedy, emotional, horror, surprise, disgust, neutral],
      labels: ['Comedy', 'Emotional', 'Horror', 'Surprise', 'Disgust', 'Neutral'],
      type: 'pie'
    }];
    
    var layout = {
      title: 'Movie Analytixx',
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('response', data, layout);

}