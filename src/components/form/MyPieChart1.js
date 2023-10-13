import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { SixK } from '@mui/icons-material';

 function MyPieChart1({total,data,other}) {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => {
            const percentage = ((item.value / total) * 100).toFixed(2); // Tính phần trăm và làm tròn đến 2 chữ số thập phân
            return `${item.label} (${percentage}%)`; // Hiển thị phần trăm
          },
          arcLabelMinAngle: 45,
        
          data:data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          // fontWeight: 'bold',
        },
      }}
      {...other}
    />
  );
}
export default MyPieChart1