import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { commonStyle, commonStyleLeft } from '../../../utils/heplFuntion';
import { useSelector } from 'react-redux';

function ThongKeGMHS({ bcGM }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  let commonStyleLeftReponsive = isSmallScreen ? {...commonStyleLeft, fontSize: '0.8rem'} : {...commonStyleLeft};

  const {darkMode} = useSelector((state)=>state.mytheme)
  commonStyleReponsive = darkMode?{...commonStyleReponsive,color:"#FFF"}:{...commonStyleReponsive}
  commonStyleLeftReponsive = darkMode?{...commonStyleLeftReponsive,color:'#FFF'}:{...commonStyleLeftReponsive}

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
     
     <TableContainer component={Paper}>
     <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#1939B7', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: '1.3rem'}} >   Báo cáo khoa gây mê hồi sức </Typography>
   
   </Card>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell style={commonStyleReponsive}>Bác sĩ trực</TableCell>
            <TableCell style={commonStyleReponsive}>KTV, điều dưỡng trực</TableCell>
            <TableCell style={commonStyleReponsive}>Số ca phẫu thuật</TableCell>
            <TableCell style={commonStyleReponsive}>Số ca mổ trong giờ</TableCell>
            <TableCell style={commonStyleReponsive}>Số ca mổ ngoài giờ</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
              
              <TableCell style={commonStyleLeftReponsive}>{row.BSTruc}</TableCell>
              <TableCell style={commonStyleLeftReponsive}>{row.DDTruc}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['gmhs-TongMo']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['gmhs-TrongGio']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['gmhs-NgoaiGio']}</TableCell>
              
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default ThongKeGMHS;
