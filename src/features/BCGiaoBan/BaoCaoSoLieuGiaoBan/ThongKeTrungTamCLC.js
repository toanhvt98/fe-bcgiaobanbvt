import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Card, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import ThongKeGiuongCLC from './ThongKeGiuongCLC';

function ThongKeTrungTamCLC(){
const {baocaongays} = useSelector((state)=>state.bcgiaoban)

  
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
     <TableContainer component={Paper} style={{ backgroundColor: '#f2f2f2', }}>
    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Khoa</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Bác sĩ trực</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Tổng số</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Vào viện</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Chuyển viện</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Tử vong</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>NB nặng</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Xin về</TableCell>
            <TableCell style={{ color: '#004d99', fontWeight: 'bold', fontSize: '1.02rem' }}>Phẫu thuật</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row.TenKhoa}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row.BSTruc}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['ls-TongNB']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['ls-NgoaiGio']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['ls-ChuyenVien']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['ls-TuVong']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['ls-Nang']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['ls-XinVe']}</Typography></TableCell>
              <TableCell><Typography style={{ fontWeight: 'bold',color: '#004d99' }}>{row['ls-PhauThuat']}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};

export default ThongKeTrungTamCLC;
