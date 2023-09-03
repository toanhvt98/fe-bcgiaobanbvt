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
} from "@mui/material";
import { useSelector } from "react-redux";
import ThongKeGiuongCLC from "./ThongKeGiuongCLC";

function ThongKeCanLamSang() {
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
      <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#004d99', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize: '1.3rem'}} > 3.Báo cáo cận lâm sàng </Typography>
   
   </Card>
      <Divider />
      <TableContainer component={Paper} style={{ backgroundColor: "#f2f2f2" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                Khoa
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                BS trực
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                XQ
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                CT16
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                CT128
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                MRI
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                Siêu âm
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                Nội soi
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                XNHH
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                Sinh hóa
              </TableCell>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.02rem",
                }}
              >
                Vi sinh
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row.TenKhoa}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row.BSTruc}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["cdha-Xquang"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["cdha-CT16"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["cdha-CT128"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["cdha-MRI"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["tdcn-SieuAm"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["tdcn-NoiSoi"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["xn-HuyetHoc"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["xn-HoaSinh"]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["xn-ViSinh"]}
                  </Typography>
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
