

var attentionArray = [50, 100, 200, 120, 64, 75, 90, 79, 80, 99, 105,104,102,140, 130,124]

var colorscaleValue = [
  [0, '#ffe5e5'],
  [1, '#7f0000']
];

  var data = [
    {
      z: [attentionArray],
      type: 'heatmap',
      colorscale: colorscaleValue,
      showscale: false,
      hoverinfo: 'none'
    }
  ];
  
  

  var layout = {
    autosize: true,
    xaxis: {
      showgrid:false,
      zeroline:false,
      showline:false,
      autotick:true,
      ticks:'',
      showticklabels:false,
      side: 'top',
      label: false
    },
    yaxis: {
      showgrid:false,
      zeroline:false,
      showline:false,
      autotick:true,
      ticks:'',
      showticklabels:false,
      ticksuffix: ' ',
      width: 700,
      height: 700,
      autosize: false
    },
    // margin: {
    //   l: 50,
    //   r: 50,
    //   b: 50,
    //   t: 50,
    //   pad: 4
    // }
  };

  Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});