import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import SimpleModal from "./SimpleModal";

class BarAPexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Thêm trạng thái để kiểm soát việc hiển thị component dựa trên cột được click
      selectedBar: null, // Hoặc giữ dữ liệu cụ thể của cột được click
      showModal: false, // Thêm trạng thái cho modal
      series: [
        {
          data: props.data,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          events: {
            // Thêm event listener cho click vào cột
            click: (event, chartContext, { dataPointIndex }) => {
              if (dataPointIndex === 4)
                this.setState({ selectedBar: dataPointIndex, showModal: true }); // Mở modal khi click vào cột
            },
          },
        },
        colors: [
          "#1939B7",
          "#00C49F",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#00D9E9",
          "#00D9E9",
          "#FF66C3",
          "#546E7A",
          "#D10CE8",
          "#546E7A",
          "#546E7A",
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
            // colors: [
            //   "#FFF",
            //   "#FFF",
            //   "#FFF",
            //   "#FFF",
            //   "#bb1515",
            //   "#bb1515",
            //   "#bb1515",
            //   "#bb1515",
            //   "#bb1515",
            //   "#bb1515",
            //   "#bb1515",
            //   "#bb1515",
            //   "#bb1515",
             
            // ], // Màu sắc của text
            fontSize: "15px", // Cỡ chữ của text
            fontFamily: "Helvetica, Arial, sans-serif", // Phông chữ
            fontWeight: 400, // Độ đậm
            
          },
          formatter: function(val, opts) {
            // opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex] là giá trị của điểm dữ liệu
            // Sử dụng giá trị này hoặc chỉ số opts.dataPointIndex để xác định màu sắc nếu cần
            // Ví dụ, trả về giá trị val với màu sắc tùy chỉnh dựa trên điều kiện
            return val;
          },
          colors: function({ value, seriesIndex, w }) {
            // Đây là nơi bạn định nghĩa logic để chọn màu sắc dựa trên value, seriesIndex, hoặc dataPointIndex
            // Ví dụ đơn giản: thay đổi màu dựa trên giá trị
            if (value < 10) return '#ff4560'; // Màu đỏ cho giá trị dưới 10
            if (value >= 10 && value < 20) return '#00e396'; // Màu xanh lá cho giá trị từ 10 đến 20
            return '#feb019'; // Màu cam cho các giá trị khác
          }
        },
        xaxis: {
          categories: props.categories,
          labels: {
            style: {
              colors: ["#1939B7"], // Màu sắc của text
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
                "#1939B7",
                "#1939B7",
                "#1939B7",
                "#1939B7",
                "#bb1515",
                "#1939B7",
                "#1939B7",
                "#1939B7",
                "#1939B7",
                "#1939B7",
                "#1939B7",
                "#1939B7",
                "#1939B7",
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
        </div>
       
      </div>
    );
  }
}
export default BarAPexChart;
// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
{/* <SimpleModal isOpen={showModal} onClose={this.closeModal}> */}
{/* Hiển thị thông tin bạn muốn dựa vào cột được chọn */}
// Component cho cột {selectedBar !== null ? selectedBar + 1 : ""}
// </SimpleModal>