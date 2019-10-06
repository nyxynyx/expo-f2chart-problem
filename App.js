import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chart from 'react-native-f2chart';

const initScript = data =>`
(function(){
    chart =  new F2.Chart({
        id: 'chart',
        pixelRatio: window.devicePixelRatio,
    });
    chart.source(${JSON.stringify(data)}, {
    value: {
    tickCount: 5,
    min: 0
    },
    date: {
    type: 'timeCat',
    range: [0, 1],
    tickCount: 3
    }
    });
    chart.tooltip({
    custom: true,
    showXTip: true,
    showYTip: true,
    snap: true,
    onChange: function(obj) {
        window.postMessage(stringify(obj))
    },
    crosshairsType: 'xy',
    crosshairsStyle: {
    lineDash: [2]
    }
    });
    chart.axis('date', {
    label: function label(text, index, total) {
    var textCfg = {};
    if (index === 0) {
        textCfg.textAlign = 'left';
    } else if (index === total - 1) {
        textCfg.textAlign = 'right';
    }
    return textCfg;
    }
    });
    chart.line().position('date*value');
    chart.render();
})();
`;

export default function App() {

  var data = [{
    date: "2017-06-05",
    value: 116
  }, {
    date: "2017-06-06",
    value: 129
  }, {
    date: "2017-06-07",
    value: 135
  }, {
    date: "2017-06-08",
    value: 86
  }, {
    date: "2017-06-09",
    value: 73
  }, {
    date: "2017-06-10",
    value: 85
  }];

  return (
    <View style={styles.container}>
      <Text>My Chart</Text>
      <View style={{ height: 350, width: '100%', backgroundColor: '#555' }}>
        <Chart initScript={initScript(data)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
