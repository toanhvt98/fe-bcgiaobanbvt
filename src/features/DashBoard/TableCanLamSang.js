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
    : { ...commonStyleLeft};
  commonStyleReponsive = darkMode
    ? { ...commonStyleReponsive, color: "#FFF" }
    : { ...commonStyleReponsive };
  commonStyleLeftReponsive = darkMode
    ? { ...commonStyleLeftReponsive, color: "#FFF" }
    : { ...commonStyleLeftReponsive };

    
    const rowStyle = {
        height: '35px', // Adjust the height as needed
        '& td, & th': { padding: '5px' }, // Adjust the padding as needed
      };

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
          <Typography sx={{textAlign:'center', fontSize: isSmallScreen ? "1rem" : "1.3rem" }}>
            {type === 0? `Thời gian chờ làm cận lâm sàng`: `Thời gian chờ kết quả cận lâm sàng`}
          </Typography>
          <Typography sx={{textAlign:'center', fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
            {type === 0? `(Tính từ khi NB có chỉ định cận lâm sàng đến khi được gọi vào phòng thực hiện)`: `(Tính từ khi người bệnh được gọi vào làm đến khi trả kết quả  )`}
          </Typography>
        </Card>
        <Table>
          <TableHead>
            <TableRow sx={rowStyle}>
              <TableCell style={commonStyleReponsive}>Loại</TableCell>
              {type===1 && (
                <TableCell style={commonStyleReponsive}>Tiêu chuẩn (phút)</TableCell>
              )}
              <TableCell style={commonStyleReponsive}>Trung bình (phút)</TableCell>
              <TableCell style={commonStyleReponsive}>Lâu nhất (phút)</TableCell>
              <TableCell style={commonStyleReponsive}>Nhanh nhất (phút)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {canlamsangs.map((row, index) => (
              <TableRow key={index} sx={rowStyle}>
                <TableCell style={commonStyleLeftReponsive}>
                  {row.Name}
                </TableCell>
                {type===1 &&(
                    <TableCell style={commonStyleLeftReponsive}>
                    {row.TieuChuan}
                  </TableCell>
                )}
                <TableCell style={ commonStyleLeftReponsive}>
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
