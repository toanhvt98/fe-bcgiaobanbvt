
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
class BarAPexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        data: props.data
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        colors: ['#1939B7', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3', '#546E7A', '#D10CE8'],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff'], // Màu sắc của text
            fontSize: '14px', // Cỡ chữ của text
            fontFamily: 'Helvetica, Arial, sans-serif', // Phông chữ
            fontWeight: 500, // Độ đậm
          },
        },
        xaxis: {
          categories: props.categories,
          labels: {
            style: {
              colors: ['#fff'], // Màu sắc của text
              fontSize: '12px', // Cỡ chữ của text
              fontFamily: 'Helvetica, Arial, sans-serif', // Phông chữ
              fontWeight: 200, // Độ đậm
            },
          }
        },
        // yaxis: {
        //   reversed: true
        // }
        yaxis: {
          labels: {
            style: {
              colors: ['white','white','white','white','white','white','white','white','white','white'], // Màu sắc của text
              fontSize: '12px', // Cỡ chữ của text
              // fontFamily: 'Helvetica, Arial, sans-serif', // Phông chữ
              fontWeight: 200, // Độ đậm
            },
          }
        },
      },
    
    
    };
  }



  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={320} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
export default BarAPexChart;
// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);