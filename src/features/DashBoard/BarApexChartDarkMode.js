import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import CardXuTriKham from "./CardXuTriKham";
import SimpleModal from "./SimpleModal";

class BarApexChartDarkMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Thêm trạng thái để kiểm soát việc hiển thị component dựa trên cột được click
      selectedBar: null, // Hoặc giữ dữ liệu cụ thể của cột được click
      showModal: false, // Thêm trạng thái cho modal
      series: [
        {
          data: props.data,
          data1:props.data1,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          events: {
            // Thêm event listener cho click vào cột
            click: (event, chartContext, { dataPointIndex }) => {
              if(dataPointIndex===4)
              this.setState({ selectedBar: dataPointIndex, showModal: true }); // Mở modal khi click vào cột
            }
          },
        },
        colors: [
          "#1939B7",
          "#00C49F",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#00D9E9",

          "#FF66C3",
          "#546E7A",
          "#D10CE8",
          "#546E7A",
        ],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["#fff"], // Màu sắc của text
            fontSize: "14px", // Cỡ chữ của text
            fontFamily: "Helvetica, Arial, sans-serif", // Phông chữ
            fontWeight: 600, // Độ đậm
          },
        },
        xaxis: {
          categories: props.categories,
          labels: {
            style: {
              colors: ["#fff"], // Màu sắc của text
              fontSize: "12px", // Cỡ chữ của text
              fontFamily: "Helvetica, Arial, sans-serif", // Phông chữ
              fontWeight: 200, // Độ đậm
            },
          },
        },
        // yaxis: {
        //   reversed: true
        // }
        yaxis: {
          labels: {
            style: {
              colors: [
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
                "#FFF",
              ], // Màu sắc của text
              fontSize: "12px", // Cỡ chữ của text
              // fontFamily: 'Helvetica, Arial, sans-serif', // Phông chữ
              fontWeight: 200, // Độ đậm
            },
          },
        },
      },
    };
  }
  closeModal = () => this.setState({ showModal: false });
  componentDidUpdate(prevProps) {
    // Kiểm tra nếu prop data thay đổi
    if (prevProps.data !== this.props.data) {
      // Cập nhật state với dữ liệu mới
      this.setState({
        series: [
          {
            data: this.props.data,
          },
        ],
      });
    }
  }

  render() {
    const { selectedBar, showModal } = this.state;
     
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={320}
          />
          <SimpleModal isOpen={showModal} onClose={this.closeModal} >
          {/* Hiển thị thông tin bạn muốn dựa vào cột được chọn */}
          Component cho cột {selectedBar !== null ? selectedBar + 1 : ''}
        </SimpleModal>
        </div>
       
      </div>
    );
  }
}
export default BarApexChartDarkMode;
// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
