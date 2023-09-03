import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card } from '@mui/material';
import { useSelector } from 'react-redux';

function ThongKeHuyetHocTM() {

  const {baocaongays} =useSelector((state)=>state.bcgiaoban)
const filterBCs = baocaongays.filter(baocaongay=>baocaongay.KhoaID.MaKhoa==='HHTM');

const row = {
       
};
[  'Bacsi', 'hhtm-HongCau', 'hhtm-HuyetTuong','hhtm-TieuCau',"hhtm-TongXN",].forEach((code) => {
  row[code] = "";
});
if(filterBCs.length>0) {
  const bcHHTM = filterBCs[0];
  console.log("bcHHTM",bcHHTM)
     

      bcHHTM.ChiTietChiSo.forEach((chitiet) => {
        if (row.hasOwnProperty(chitiet.ChiSoCode)) {
          row[chitiet.ChiSoCode] = chitiet.SoLuong;
        row['Bacsi'] = bcHHTM.BSTruc
        }})
}

     return (
   
     <TableContainer component={Paper} style={{ backgroundColor: '#f2f2f2',my:3 }}>
     <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#004d99', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: '1.3rem'}} > 4.Báo cáo ĐV huyết học truyền máu</Typography>
   
   </Card>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center'}}>Bác sĩ</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center' }}>Khối hồng cầu</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center' }}>Huyết tương tươi</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center' }}>Tiểu cầu máy</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem',textAlign:'center' }}>Tổng xét nghiệm</TableCell>
            
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
             
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['Bacsi']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['hhtm-HongCau']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['hhtm-HuyetTuong']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row['hhtm-TieuCau']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99',textAlign:'center' }}>{row["hhtm-TongXN"]}</Typography></TableCell>
              
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    
  );
};

export default ThongKeHuyetHocTM;
