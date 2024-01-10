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
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { commonStyle } from "../../../utils/heplFuntion";
import { useTheme } from "@emotion/react";

function ThongKeGiuongCLC() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let commonStyleReponsive = isSmallScreen
    ? { ...commonStyle, fontSize: "0.8rem" }
    : { ...commonStyle };

  const { darkMode } = useSelector((state) => state.mytheme);
  commonStyleReponsive = darkMode
    ? { ...commonStyleReponsive, color: "#FFF" }
    : { ...commonStyleReponsive };

  const { baocaongays } = useSelector((state) => state.bcgiaoban);
  const filterBCs = baocaongays.filter(
    (baocaongay) => baocaongay.KhoaID.MaKhoa === "CLC"
  );
  console.log("filter BC", filterBCs);
  const row = {};
  ["clc-TongNB", "clc-VaoThang", "clc-ChuyenSang", "clc-GiuongTrong"].forEach(
    (code) => {
      row[code] = 0;
    }
  );
  if (filterBCs.length > 0) {
    const bcCLC = filterBCs[0];
    console.log("bcCLC", bcCLC);

    bcCLC.ChiTietChiSo.forEach((chitiet) => {
      if (row.hasOwnProperty(chitiet.ChiSoCode)) {
        row[chitiet.ChiSoCode] = chitiet.SoLuong;
      }
    });
  }

  return (
    <TableContainer component={Paper} style={{ my: 3 }} id='tinhhinhchungclc' >
      <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
          backgroundColor: "#1939B7",
          p: 1,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <Typography sx={{ fontSize: isSmallScreen ? "0.9rem" : "1.3rem" }}>
          {" "}
          Trung tâm khám chữa bệnh chất lượng cao{" "}
        </Typography>
      </Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={commonStyleReponsive}>Tổng số NB</TableCell>
            <TableCell style={commonStyleReponsive}>NB vào thẳng</TableCell>
            <TableCell style={commonStyleReponsive}>
              NB từ các khoa chuyển sang
            </TableCell>
            <TableCell style={commonStyleReponsive}>Số giường trống</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={commonStyleReponsive}>
              {row["clc-TongNB"]}
            </TableCell>
            <TableCell style={commonStyleReponsive}>
              {row["clc-VaoThang"]}
            </TableCell>
            <TableCell style={commonStyleReponsive}>
              {row["clc-ChuyenSang"]}
            </TableCell>
            <TableCell style={commonStyleReponsive}>
              {row["clc-GiuongTrong"]}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ThongKeGiuongCLC;
