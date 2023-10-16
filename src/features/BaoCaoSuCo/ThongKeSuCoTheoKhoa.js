import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card, useMediaQuery } from '@mui/material';

import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

function ThongKeSuCoTheoKhoa(){
  const theme = useTheme();
  const commonStyle = {
    color: "#1939B7",
    fontWeight: "bold",
    fontSize: "1rem",
    textAlign: "center",
    whiteSpace: "normal",
    wordWrap: "break-word",
    border: "1px solid #1939B7",
  };
   const commonStyleLeft = {
    color: "#1939B7",
    fontWeight: "bold",
    fontSize: "1rem",
  
    whiteSpace: "normal",
    wordWrap: "break-word",
    border: "1px solid #1939B7",
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  const commonStyleLeftReponsive = isSmallScreen ? {...commonStyleLeft, fontSize: '0.8rem'} : {...commonStyleLeft};
  const {tonghopSuCoTheoKhoa} = useSelector((state)=>state.baocaosuco)
 
  return (
    <Container sx={{my:1}}  id='tongtruchenoi'>
     
     <TableContainer component={Paper} style={{ backgroundColor: 'white' }}>
     {/* <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#1939B7', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: isSmallScreen?'1rem':'1.3rem'}} > Trực lãnh đạo:</Typography>
   <Typography sx={{fontSize: isSmallScreen?'1rem':'1.3rem'}} > Tổng trực: </Typography>
   </Card> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={commonStyleReponsive}>STT</TableCell>
            <TableCell style={commonStyleReponsive}>Khoa, Phòng, Đơn vị</TableCell>
            <TableCell style={commonStyleReponsive}>Số lượng</TableCell>
            <TableCell style={commonStyleReponsive}>Tỷ lệ</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {tonghopSuCoTheoKhoa.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={commonStyleReponsive}>{row.STT}</TableCell>
              <TableCell style={commonStyleLeftReponsive}>{row.TenKhoa}</TableCell>
              <TableCell style={commonStyleReponsive}>{row.SoLuong}</TableCell>
              <TableCell style={commonStyleReponsive}>{row.TyLe}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default ThongKeSuCoTheoKhoa;
