
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
class BarAPexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        data: [20, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        colors: ['#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3', '#546E7A', '#D10CE8'],
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
            fontWeight: 400, // Độ đậm
          },
        },
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
        }
      },
    
    
    };
  }



  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
export default BarAPexChart;
// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);