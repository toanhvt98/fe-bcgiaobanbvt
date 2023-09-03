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
} from "@mui/material";
import { useSelector } from "react-redux";

function ThongKeVaoVien() {
  const { baocaongays } = useSelector((state) => state.bcgiaoban);
  const bcLamSang = baocaongays
    .filter((baocaongay) => {
      return (
        baocaongay.KhoaID.LoaiKhoa === "noi" ||
        baocaongay.KhoaID.LoaiKhoa === "ngoai"
      );
    })
    .sort((a, b) => {
      return a.KhoaID.STT - b.KhoaID.STT;
    });
  const getRowData = () => {
    let totalRow = {
      TenKhoa: "Tổng",

      "ls-NgoaiGio": 0,
    };
    let stt = 0;
    const rows = bcLamSang.map((entry) => {
      const row = {
        TenKhoa: entry.KhoaID.TenKhoa,
        BSTruc: entry.BSTruc,
      };

      ["ls-NgoaiGio"].forEach((code) => {
        row[code] = 0;
      });

      entry.ChiTietChiSo.forEach((chitiet) => {
        if (row.hasOwnProperty(chitiet.ChiSoCode)) {
          row[chitiet.ChiSoCode] = chitiet.SoLuong;
          totalRow[chitiet.ChiSoCode] += chitiet.SoLuong;
        }
      });
      stt++;
      row["STT"] = stt;
      return row;
    });

    rows.unshift(totalRow);

    return rows;
  };

  const rows = getRowData();

  return (
    <Container sx={{ my: 1 }} id = 'khoacapcuu'>
      <TableContainer component={Paper} style={{ backgroundColor: "#f2f2f2" }}>
        <Card
          sx={{
            fontWeight: "bold",
            color: "#f2f2f2",
            backgroundColor: "#004d99",
            p: 1,
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Typography sx={{ fontSize: "1.3rem" }}>
            {" "}
            I. Trực khoa cấp cứu{" "}
          </Typography>
          <Typography sx={{ fontSize: "1.3rem" }}> Kíp trực </Typography>
        </Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                STT
              </TableCell>

              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Khoa
              </TableCell>

              <TableCell
                style={{
                  color: "#004d99",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Vào viện
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row['STT']}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row.TenKhoa}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography style={{ fontWeight: "bold", color: "#004d99" }}>
                    {row["ls-NgoaiGio"]}
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

export default ThongKeVaoVien;
