import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Card,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";

import { commonStyle, commonStyleLeft } from "../../../utils/heplFuntion";
import { useTheme } from "@emotion/react";

function ThongKeCanLamSang() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const commonStyleReponsive = isSmallScreen ? {...commonStyle, fontSize: '0.8rem'} : {...commonStyle};
  // const commonStyleLeftReponsive = isSmallScreen ? {...commonStyleLeft, fontSize: '0.8rem'} : {...commonStyleLeft};
  const { baocaongays, chisos } = useSelector((state) => state.bcgiaoban);

  const bcKhoaCLS = baocaongays.filter((baocaongay) =>
    ["CDHA", "TDCN", "XNHoaSinh", "XNViSinh", "XNHuyetHoc"].includes(
      baocaongay.KhoaID.MaKhoa
    )
  ).sort((a, b) => {
    return a.KhoaID.STT - b.KhoaID.STT;
  });

  const getRowData = () => {
    const rows = bcKhoaCLS.map((entry) => {
      const row = {
        TenKhoa: entry.KhoaID.TenKhoa,
        BSTruc: entry.BSTruc,
      };

      [
        "cdha-Xquang",
        "cdha-CT16",
        "cdha-CT128",
        "cdha-MRI",
        "tdcn-SieuAm",
        "tdcn-NoiSoi",
        "xn-HuyetHoc",
        "xn-HoaSinh",
        "xn-ViSinh",
      ].forEach((code) => {
        row[code] = "";
      });

      entry.ChiTietChiSo.forEach((chitiet) => {
        if (row.hasOwnProperty(chitiet.ChiSoCode)) {
          row[chitiet.ChiSoCode] = chitiet.SoLuong;
        }
      });

      return row;
    });

    return rows;
  };

  const rows = getRowData();

  return (
    <Container sx={{ my: 1,} } id='section1' >
      <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#1939B7', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: isSmallScreen?'1rem':'1.3rem'}} > 3.Báo cáo cận lâm sàng </Typography>
   
   </Card>
      <Divider />
      <TableContainer component={Paper}  style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={commonStyleReponsive}
              >
                Khoa
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                BS trực
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                XQ
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                CT16
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                CT128
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                MRI
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                Siêu âm
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                Nội soi
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                XNHH
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                Sinh hóa
              </TableCell>
              <TableCell
                style={commonStyleReponsive}
              >
                Vi sinh
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={commonStyleReponsive}>
                    {row.TenKhoa}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row.BSTruc}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["cdha-Xquang"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["cdha-CT16"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["cdha-CT128"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["cdha-MRI"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["tdcn-SieuAm"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["tdcn-NoiSoi"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["xn-HuyetHoc"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["xn-HoaSinh"]}
                  
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                    {row["xn-ViSinh"]}
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ThongKeCanLamSang;
