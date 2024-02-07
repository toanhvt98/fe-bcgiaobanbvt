import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const xLabels = [
  'Xét nghiệm',
  'XQuang',
  'CT',
  'MRI',
  'Siêu âm',
  'CN Hô hấp',
  'Đo MĐLX',
  'Nội soi',
  'Điện não',
  'Điện tim',
];

const StackBarTyLeTraDungCLS = ()=> {
    const theme = useTheme();
    const { darkMode } = useSelector((state) => state.mytheme);
    const {tyletraCLS} = useSelector((state)=>state.dashboard)
    
  return (
    <Card sx={{
        fontWeight: "bold",
        color: darkMode?"#FFF":"#1939B7",
      p:1,
        boxShadow: 3,
        borderRadius: 1,
      }}>
Tỷ lệ trả đúng thời gian kết quả cận lâm sàng
      {tyletraCLS.TyLeDung && tyletraCLS.TyLeSai &&<BarChart
          width={950}
          height={230}
          series={[
            { data: tyletraCLS.TyLeDung, label: 'Tỷ lệ trả đúng thời gian (%)', id: 'pvId', stack: 'total',color:"#1939B7" },
            { data: tyletraCLS.TyLeSai, label: 'Tỷ lệ trả sai thời gian (%)', id: 'uvId', stack: 'total',color:"#7A91D9" },
          ]}
          xAxis={[{ data: tyletraCLS.Labels, scaleType: 'band' }]}
        />}
    </Card>
  );
}
export default StackBarTyLeTraDungCLS;