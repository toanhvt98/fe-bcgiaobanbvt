import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card } from '@mui/material';

function ThongKeGMHS({ bcGM }) {

  console.log("bcgm",bcGM)
      const row = {
        BSTruc: bcGM.BSTruc,
        DDTruc: bcGM.DDTruc,
      };
      [  'gmhs-TongMo', 'gmhs-TrongGio', 'gmhs-NgoaiGio'].forEach((code) => {
        row[code] = 0;
      });

      bcGM.ChiTietChiSo.forEach((chitiet) => {
        if (row.hasOwnProperty(chitiet.ChiSoCode)) {
          row[chitiet.ChiSoCode] = chitiet.SoLuong;
        
        }})
   


  return (
    <Container sx={{my:1}} >
     
     <TableContainer component={Paper} style={{ backgroundColor: '#f2f2f2' }}>
     <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#004d99', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: '1.3rem'}} >   Báo cáo khoa gây mê hồi sức </Typography>
   
   </Card>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Bác sĩ trực</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>KTV, điều dưỡng trực</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Số ca phẫu thuật</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Số ca mổ trong giờ</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Số ca mổ ngoài giờ</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
              
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row.BSTruc}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row.DDTruc}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['gmhs-TongMo']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['gmhs-TrongGio']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['gmhs-NgoaiGio']}</Typography></TableCell>
              
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default ThongKeGMHS;
