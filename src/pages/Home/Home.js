/**
 * @Author : Duanjl
 * @Date: 9/4/2018
 * @Last Modified by：Duanjl
 * @Last modified time： 9/4/2018
 * */
import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function getData(n) {
  const arr = [];
  let i;
  let a;
  let b;
  let c;
  let spike;
  for (i = 0; i < n; i += 1) {
    if (i % 100 === 0) {
      a = 2 * Math.random();
    }
    if (i % 1000 === 0) {
      b = 2 * Math.random();
    }
    if (i % 10000 === 0) {
      c = 2 * Math.random();
    }
    if (i % 50000 === 0) {
      spike = 10;
    } else {
      spike = 0;
    }
    arr.push([i, 2 * Math.sin(i / 100) + a + b + c + spike + Math.random()]);
  }
  return arr;
}

const options = {
  chart: { zoomType: 'x' },
  boost: { useGPUTranslations: true },
  tooltip: { valueDecimals: 2 },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  title: { text: 'Nginx Status / m' },
  series: [
    {
      data: getData(10),
      name: 'Active',
      lineWidth: 0.5,
    },
    {
      data: getData(10),
      name: 'Waiting',
      lineWidth: 0.5,
    },
  ],
};

function getOptions(names, data) {
  const optionsTemp = JSON.parse(JSON.stringify(options));
  if (names.length === data.length) {
    optionsTemp.series = names.map((name, index) => ({
      data: data[index],
      name,
      lineWidth: 0.5,
    }));
  }
  return optionsTemp;
}

function Home(props) {
  const option1 = getOptions(
    ['Active', 'Reading', 'Waiting', 'Writing'],
    [getData(100), getData(100), getData(100), getData(100)],
  );
  const option2 = getOptions(
    ['Active', 'Reading', 'Waiting', 'Writing'],
    [getData(100), getData(100), getData(100), getData(100)],
  );
  const option3 = getOptions(
    ['Active', 'Reading', 'Waiting', 'Writing'],
    [getData(100), getData(100), getData(100), getData(100)],
  );
  const option4 = getOptions(
    ['Active', 'Reading', 'Waiting', 'Writing'],
    [getData(100), getData(100), getData(100), getData(100)],
  );
  const option5 = getOptions(
    ['Active', 'Reading', 'Waiting', 'Writing'],
    [getData(100), getData(100), getData(100), getData(100)],
  );
  const option6 = getOptions(
    ['Active', 'Reading', 'Waiting', 'Writing'],
    [getData(100), getData(100), getData(100), getData(100)],
  );
  const option7 = getOptions(
    ['Active', 'Reading', 'Waiting', 'Writing'],
    [getData(100), getData(100), getData(100), getData(100)],
  );
  console.log(props);
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10,10%)',
        gridTemplateRows: 'repeat(9,auto)',
      }}
    >
      <div
        id="chart1"
        style={{ gridRow: '1 / span 3', gridColumn: '1 / span 4' }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={option1}
          // redraw
          // oneToOne
        />
      </div>
      <div
        id="chart2"
        style={{ gridRow: '1 / span 3', gridColumn: '5 / span 6' }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={option2}
          // redraw
          // oneToOne
        />
      </div>
      <div
        id="chart3"
        style={{ gridRow: '4 / span 3', gridColumn: '1 / span 6' }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={option3}
          // redraw
          // oneToOne
        />
      </div>
      <div
        id="chart3"
        style={{ gridRow: '4 / span 3', gridColumn: '7 / span 4' }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={option4}
          // redraw
          // oneToOne
        />
      </div>
      <div
        id="chart3"
        style={{ gridRow: '8 / span 3', gridColumn: '1 / span 3' }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={option5}
          // redraw
          // oneToOne
        />
      </div>
      <div
        id="chart3"
        style={{ gridRow: '8 / span 3', gridColumn: '4 / span 3' }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={option6}
          // redraw
          // oneToOne
        />
      </div>
      <div
        id="chart3"
        style={{ gridRow: '8 / span 3', gridColumn: '7 / span 4' }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={option7}
          // redraw
          // oneToOne
        />
      </div>
    </section>
  );
}

export default Home;
