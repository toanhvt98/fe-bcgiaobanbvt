import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card } from '@mui/material';
import { useSelector } from 'react-redux';

function ThongKeGiuongCLC() {

  const {baocaongays} =useSelector((state)=>state.bcgiaoban)
const filterBCs = baocaongays.filter(baocaongay=>baocaongay.KhoaID.MaKhoa==='CLC');
console.log("filter BC",filterBCs)
const row = {
       
};
[  'clc-TongNB', 'clc-VaoThang', 'clc-ChuyenSang','clc-GiuongTrong'].forEach((code) => {
  row[code] = 0;
});
if(filterBCs.length>0) {
  const bcCLC = filterBCs[0];
  console.log("bcCLC",bcCLC)
     

      bcCLC.ChiTietChiSo.forEach((chitiet) => {
        if (row.hasOwnProperty(chitiet.ChiSoCode)) {
          row[chitiet.ChiSoCode] = chitiet.SoLuong;
        
        }})
}

     return (
   
     <TableContainer component={Paper} style={{ backgroundColor: '#f2f2f2',my:3 }}>
     <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#004d99', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: '1.3rem'}} >   Trung tâm khám chữa bệnh chất lượng cao </Typography>
   
   </Card>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center'}}>Tổng số NB</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center' }}>NB vào thẳng</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center' }}>NB từ các khoa chuyển sang</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center' }}>Số giường trống</TableCell>
            
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
             
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['clc-TongNB']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['clc-VaoThang']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['clc-ChuyenSang']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['clc-GiuongTrong']}</Typography></TableCell>
              
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    
  );
};

export default ThongKeGiuongCLC;
