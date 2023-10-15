import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Nặng: 400', value: 400},
  { label: 'Nhẹ: 300', value: 300},
  { label: 'Trung bình: 300', value: 300},
  { label: 'Tổng cộng: 150', value: 0, color: 'white' },
];
// const data = [
//   { label: 'Group A', value: 400, color: '#0088FE' },
//   { label: 'Group B', value: 300, color: '#00C49F' },
//   { label: 'Group C', value: 300, color: '#FFBB28' },
//   { label: 'Tổng cộng : 150', value: 0, color: 'white' },
// ];

const sizing = {
  // margin: { right: -5 },
  width: 500,
  height: 200,
  // legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  if (percent===0){
    return ""
  }  else
  return `${(percent * 100).toFixed(0)}%`;
};

 function MyPieChart2() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 100,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
export default MyPieChart2