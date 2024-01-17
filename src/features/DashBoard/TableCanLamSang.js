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
import { commonStyle, commonStyleLeft } from "../../utils/heplFuntion";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";

function TableCanLamSang({ canlamsangs, type }) {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let commonStyleReponsive = isSmallScreen
    ? { ...commonStyle, fontSize: "0.8rem" }
    : { ...commonStyle };
  let commonStyleLeftReponsive = isSmallScreen
    ? { ...commonStyleLeft, fontSize: "0.8rem" }
    : { ...commonStyleLeft };
  commonStyleReponsive = darkMode
    ? { ...commonStyleReponsive, color: "#FFF" }
    : { ...commonStyleReponsive };
  commonStyleLeftReponsive = darkMode
    ? { ...commonStyleLeftReponsive, color: "#FFF" }
    : { ...commonStyleLeftReponsive };

  return (
    <Container sx={{ my: 1 }} id="tongtruchenoi">
      <TableContainer component={Paper}>
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
          <Typography sx={{ fontSize: isSmallScreen ? "1rem" : "1.3rem" }}>
            {type === 0? `Thời gian làm cận lâm sàng`: `Thời gian chờ kết quả`}
          </Typography>
        </Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={commonStyleReponsive}>Loại</TableCell>
              <TableCell style={commonStyleReponsive}>Trung bình</TableCell>
              <TableCell style={commonStyleReponsive}>Lâu nhất</TableCell>
              <TableCell style={commonStyleReponsive}>Nhanh nhất</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {canlamsangs.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={commonStyleLeftReponsive}>
                  {row.Name}
                </TableCell>
                <TableCell style={commonStyleLeftReponsive}>
                  {type === 0
                    ? row.TrungBinhChoThucHien
                    : row.TrungBinhChoKetQua}
                </TableCell>
                <TableCell style={commonStyleLeftReponsive}>
                  {type === 0 ? row.MaxThucHien : row.MaxChoKetQua}
                </TableCell>
                <TableCell style={commonStyleLeftReponsive}>
                  {type === 0 ? row.MinThucHien : row.MinChoKetQua}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TableCanLamSang;
