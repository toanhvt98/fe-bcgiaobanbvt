import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Container } from '@mui/material';
import { useSelector } from 'react-redux';

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
    const {tyletraCLS} = useSelector((state)=>state.dashboard)
  return (
    <Card>
Tỷ lệ trả đúng thời gian kết quả cận lâm sàng
      {tyletraCLS.TyLeDung && tyletraCLS.TyLeSai &&<BarChart
          width={1100}
          height={200}
          series={[
            { data: tyletraCLS.TyLeDung, label: 'Tỷ lệ trả đúng', id: 'pvId', stack: 'total' },
            { data: tyletraCLS.TyLeSai, label: 'Tỷ lệ trả sai', id: 'uvId', stack: 'total' },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />}
    </Card>
  );
}
export default StackBarTyLeTraDungCLS;