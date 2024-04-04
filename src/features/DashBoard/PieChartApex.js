import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChartApex = ({ data,colors,labels }) => {
  // Tính tổng của tất cả giá trị trong series
  const total = data.reduce((acc, value) => acc + value, 0);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labels,
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        
      },
      style: {
        fontSize: '14px',
        colors: ["#f4f4f4"]
      }
    },
    tooltip: {
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {

          return VND.format(value)
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: colors,
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={data}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default PieChartApex;
