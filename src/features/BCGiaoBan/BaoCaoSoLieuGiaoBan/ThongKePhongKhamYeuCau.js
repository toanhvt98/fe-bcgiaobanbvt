import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { commonStyle,  } from '../../../utils/heplFuntion';

function ThongKePhongKhamYeuCau() {
  const theme = useTheme();
  const {darkMode} = useSelector((state)=>state.mytheme)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  commonStyleReponsive = darkMode?{...commonStyleReponsive,color:"#FFF"}:{...commonStyleReponsive}
  
  const {chiso} =useSelector((state)=>state.bcgiaoban)
  console.log("chisos",chiso)

     return (
      <Container sx={{my:1}}  id='phongkhamyc'  >
     <TableContainer component={Paper} style={{ my:3 }}>
     <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#1939B7', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize:isSmallScreen?'1rem' :'1.3rem'}} > Tổng hợp các phòng khám yêu cầu </Typography>
   
   </Card>
      <Table>
      <TableHead>
        <TableRow>
          {/* 5 cột đầu tiên chiếm 3 dòng */}
          <TableCell style={commonStyleReponsive} rowSpan={3}>Tổng khám</TableCell>
          <TableCell style={commonStyleReponsive} rowSpan={3}>Bảo hiểm</TableCell>
          <TableCell style={commonStyleReponsive} rowSpan={3}>Viện phí</TableCell>
          <TableCell style={commonStyleReponsive} rowSpan={3}>Khám yêu cầu</TableCell>
          <TableCell style={commonStyleReponsive} rowSpan={3}>Vào viện</TableCell>
          {/* Chuyển viện chiếm 2 dòng */}
          <TableCell style={commonStyleReponsive} colSpan={2}>Chuyển viện</TableCell>
          {/* Ngoại tỉnh chiếm 1 dòng, sau đó chia làm 2 cột ở dòng tiếp theo */}
          <TableCell style={commonStyleReponsive} colSpan={4}>Ngoại tỉnh</TableCell>
        </TableRow>
        <TableRow>
          {/* Chuyển viện: Nội Trú, Ngoại trú */}
          <TableCell style={commonStyleReponsive} rowSpan={2}>Nội Trú</TableCell>
          <TableCell style={commonStyleReponsive} rowSpan={2}>Ngoại Trú</TableCell>
          {/* Ngoại tỉnh: Ngoại trú, Nội trú */}
          <TableCell style={commonStyleReponsive} colSpan={2}>Ngoại trú</TableCell>
          <TableCell style={commonStyleReponsive} colSpan={2}>Nội trú</TableCell>
        </TableRow>
        <TableRow>
          {/* Ngoại trú: Bảo hiểm, Viện phí */}
          <TableCell style={commonStyleReponsive}>Bảo hiểm</TableCell>
          <TableCell style={commonStyleReponsive}>Viện phí</TableCell>
          {/* Nội trú: Bảo hiểm, Viện phí */}
          <TableCell style={commonStyleReponsive}>Bảo hiểm</TableCell>
          <TableCell style={commonStyleReponsive}>Viện phí</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
          
            <TableRow >
             
              <TableCell style={commonStyleReponsive}><Typography >{chiso['kkb-TongKham']}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso['kkb-BaoHiem']}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-VienPhi"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-YeuCau"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-NBVaoVien"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-CVNoiTru"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-CVNgoaiTru"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-NgoaiTinhNgoaiTruBH"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-NgoaiTinhNgoaiTruVP"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-NgoaiTinhNoiTruBH"]}</Typography></TableCell>
              <TableCell style={commonStyleReponsive}><Typography >{chiso["kkb-NgoaiTinhNoiTruVP"]}</Typography></TableCell>
              
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default ThongKePhongKhamYeuCau;
