import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data1 = [
  { label: 'Group A', value: 400,color: "#1939B7" },
  { label: 'Group B', value: 300,color: "#bb1515" },
  { label: 'Group C', value: 300,color: "#00cc00"},
  { label: 'Group D', value: 200 },
];

const data2 = [
  { label: 'A1', value: 0,color: "#1939B7" },
  { label: 'A2', value: 300,color: "#bb1515" },
  { label: 'B1', value: 100,color: "#1939B7" },
  { label: 'B2', value: 80 },
  { label: 'B3', value: 40,color: "#1939B7" },
  { label: 'B4', value: 30 ,color: "#bb1515"},
  { label: 'B5', value: 50 ,color: "#bb1515"},
  { label: 'C1', value: 100,color: "#1939B7" },
  { label: 'C2', value: 200,color: "#bb1515" },
  { label: 'D1', value: 150,color: "#1939B7" },
  { label: 'D2', value: 50 ,color: "#bb1515"},
];

export default function TwoLevelPieChart({data1,data2,colors,other}) {
  return (
    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 80,
          data: data1,
          highlightScope: { faded: "global", highlighted: "item" },
        // faded: { innerRadius: 20, additionalRadius: -10 },
        // cx:150,
        arcLabel:(params) => {
          const percent = params.value / 200;
          if (percent===0){
            return ""
          }  else
          return `${(percent * 100).toFixed(0)}%`;
        },
        arcLabelMinAngle: 10,
        },
        {
          innerRadius: 100,
          outerRadius: 130,
          data: data2,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 10, additionalRadius: -10 },
          
          arcLabel:(params) => {
           
            return params.value;
          },
          arcLabelMinAngle: 10,
        },
      ]}
    //   width={400}
      height={300}
      slotProps={{
        legend: { hidden: true,
            direction: 'row',
        position: { vertical: 'top', horizontal: 'midle' },
        padding: 0, 
    },
      }}
    />
  );
}