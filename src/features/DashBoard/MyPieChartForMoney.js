import * as React from 'react';

import { PieChart, pieArcClasses, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { da } from 'date-fns/locale';

// const data = [
//   { label: 'Nặng: 400', value: 400},
//   { label: 'Nhẹ: 300', value: 300},
//   { label: 'Trung bình: 300', value: 300},
//   { label: 'Tổng cộng: 150', value: 0, color: 'white' },
// ];
// const data = [
//   { label: 'Group A', value: 400, color: '#0088FE' },
//   { label: 'Group B', value: 300, color: '#00C49F' },
//   { label: 'Group C', value: 300, color: '#FFBB28' },
//   { label: 'Tổng cộng : 150', value: 0, color: 'white' },
// ];

// const sizing = {
//   margin: { right: -5 },
//   width: 500,
//   height: 200,
//   legend: { hidden: true },
// };
// const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

// const getArcLabel = (params) => {
//   const percent = params.value / TOTAL;
//   if (percent===0){
//     return ""
//   }  else
//   return `${(percent * 100).toFixed(0)}%`;
// };
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
 function MyPieChartForMoney({data,colors,other,dataEx}) {
  data =data.map((dt,index)=>{
    
    let newlable =`${dt.label}:                 ${VND.format(dt.value)}`
    return {...dt,label:newlable,...colors[index]}
  })
  if (dataEx) data = [...data,...dataEx]
  const total = data.map((item)=> Number(item.value)).reduce((a,b)=>a+b,0)
  const tongcong = {label:`Tổng cộng: ${VND.format(total)}`,value:0,color:'white'}
  data.push(tongcong);
  return (
    <PieChart
    // slotProps={{
    //   legend: {
    //     direction: 'row',
    //     position: { vertical: 'top', horizontal: 'middle' },
    //     padding: 0,
    //   },
    // }}
    series={[
      {
        
        data: data,
        highlightScope: { faded: "global", highlighted: "item" },
        faded: { innerRadius: 20, additionalRadius: -10 },
        cx:150,
        arcLabel:(params) => {
          const percent = params.value / total;
          if (percent===0){
            return ""
          }  else
          return `${(percent * 100).toFixed(0)}%`;
        },
        arcLabelMinAngle: 10,
      },
    ]}
    sx={{
      [`& .${pieArcClasses.faded}`]: {
        fill: "gray",
      },
      [`& .${pieArcLabelClasses.root}`]: {
        fill: 'white',
        // fontWeight: 'bold',
      },
    }}
    // height={300}
    {...other}
  />
  );
}
export default MyPieChartForMoney