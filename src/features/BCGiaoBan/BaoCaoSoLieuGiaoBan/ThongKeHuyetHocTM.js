import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { commonStyle, commonStyleLeft } from '../../../utils/heplFuntion';
import { useTheme } from '@emotion/react';

function ThongKeHuyetHocTM() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  let commonStyleLeftReponsive = isSmallScreen ? {...commonStyleLeft, fontSize: '0.8rem'} : {...commonStyleLeft};

  const {darkMode} = useSelector((state)=>state.mytheme)
  commonStyleReponsive = darkMode?{...commonStyleReponsive,color:"#FFF"}:{...commonStyleReponsive}
  commonStyleLeftReponsive = darkMode?{...commonStyleLeftReponsive,color:'#FFF'}:{...commonStyleLeftReponsive}

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
   
     <TableContainer component={Paper} style={{ my:3 }}>
     <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#1939B7', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: isSmallScreen?'1rem':'1.3rem'}} > Báo cáo ĐV huyết học truyền máu</Typography>
   
   </Card>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell style={commonStyleReponsive}>Bác sĩ</TableCell>
            <TableCell style={commonStyleReponsive}>Khối hồng cầu</TableCell>
            <TableCell style={commonStyleReponsive}>Huyết tương tươi</TableCell>
            <TableCell style={commonStyleReponsive}>Tiểu cầu máy</TableCell>
            <TableCell style={commonStyleReponsive}>Tổng xét nghiệm</TableCell>
            
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow >
             
              <TableCell style={commonStyleLeftReponsive}>{row['Bacsi']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['hhtm-HongCau']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['hhtm-HuyetTuong']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['hhtm-TieuCau']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row["hhtm-TongXN"]}</TableCell>
              
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    
  );
};

export default ThongKeHuyetHocTM;
