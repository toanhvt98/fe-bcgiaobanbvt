import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card, Divider, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import ThongKeGiuongCLC from './ThongKeGiuongCLC';
import { commonStyle, commonStyleLeft } from '../../../utils/heplFuntion';
import { useTheme } from '@emotion/react';

function ThongKeTrungTamCLC(){
const {baocaongays} = useSelector((state)=>state.bcgiaoban)
const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  const commonStyleLeftReponsive = isSmallScreen ? {...commonStyleLeft, fontSize: '0.8rem'} : {...commonStyleLeft};
  
  const bcTrungTamCLC = baocaongays.filter(
    baocaongay => ["NoiYC", "NgoaiYC", "HSCCYC"].includes(baocaongay.KhoaID.MaKhoa)
  );
  const getRowData = () => {
    let totalRow = {
      TenKhoa: 'Tổng',
      BSTruc: '',
      'ls-TongNB': 0,
      'ls-NgoaiGio': 0,
      'ls-ChuyenVien': 0,
      'ls-TuVong': 0,
      'ls-Nang': 0,
      'ls-XinVe': 0,
      'ls-PhauThuat':0,
    };

    const rows = bcTrungTamCLC.map((entry) => {
      const row = {
        TenKhoa: entry.KhoaID.TenKhoa,
        BSTruc: entry.BSTruc,
      };

      ['ls-TongNB', 'ls-NgoaiGio', 'ls-ChuyenVien', 'ls-TuVong', 'ls-Nang', 'ls-XinVe','ls-PhauThuat'].forEach((code) => {
        row[code] = 0;
      });

      entry.ChiTietChiSo.forEach((chitiet) => {
        if (row.hasOwnProperty(chitiet.ChiSoCode)) {
          row[chitiet.ChiSoCode] = chitiet.SoLuong;
          totalRow[chitiet.ChiSoCode] += chitiet.SoLuong;
        }
      });

      return row;
    });

    rows.unshift(totalRow);

    return rows;
  };

  const rows = getRowData();

  return (
    <Container sx={{my:1}} id='tinhhinhchungclc'  >
     <ThongKeGiuongCLC/>
     <Divider/>
     <TableContainer component={Paper} style={{ backgroundColor: 'white', }}>
    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={commonStyleReponsive}>Khoa</TableCell>
            <TableCell style={commonStyleReponsive}>Bác sĩ trực</TableCell>
            <TableCell style={commonStyleReponsive}>Tổng số</TableCell>
            <TableCell style={commonStyleReponsive}>Vào viện</TableCell>
            <TableCell style={commonStyleReponsive}>Chuyển viện</TableCell>
            <TableCell style={commonStyleReponsive}>Tử vong</TableCell>
            <TableCell style={commonStyleReponsive}>NB nặng</TableCell>
            <TableCell style={commonStyleReponsive}>Xin về</TableCell>
            <TableCell style={commonStyleReponsive}>Phẫu thuật</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={commonStyleLeftReponsive}>{row.TenKhoa}</TableCell>
              <TableCell style={commonStyleLeftReponsive}>{row.BSTruc}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['ls-TongNB']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['ls-NgoaiGio']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['ls-ChuyenVien']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['ls-TuVong']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['ls-Nang']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['ls-XinVe']}</TableCell>
              <TableCell style={commonStyleReponsive}>{row['ls-PhauThuat']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default ThongKeTrungTamCLC;
