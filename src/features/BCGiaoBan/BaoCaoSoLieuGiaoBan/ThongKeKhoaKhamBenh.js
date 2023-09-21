import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { commonStyle, commonStyleLeft } from '../../../utils/heplFuntion';

function ThongKeKhoaKhamBenh() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  // const commonStyleLeftReponsive = isSmallScreen ? {...commonStyleLeft, fontSize: '0.8rem'} : {...commonStyleLeft};
  const {chiso} =useSelector((state)=>state.bcgiaoban)
  console.log("chisos",chiso)

// const commonStyle = {
//   color: '#1939B7',
//   fontWeight: 'bold',
//   fontSize: '1rem',
//   textAlign: 'center',
//   whiteSpace: 'normal',
//   wordWrap: 'break-word',
//   border: '1px solid #1939B7',
// };

     return (
      <Container sx={{my:1}}  id='khoakhambenh'  >
     <TableContainer component={Paper} style={{ backgroundColor: 'white',my:3 }}>
     <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#1939B7', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize:isSmallScreen?'1rem' :'1.3rem'}} >  Khoa khám bệnh</Typography>
   
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

export default ThongKeKhoaKhamBenh;
