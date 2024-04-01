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

function TableDoanhThuKPI({ canlamsangs, type }) {
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

    const commonStyleLeftReponsiveRed = {...commonStyleLeftReponsive,color: "#bb1515"}
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
            DỰ KIẾN DOANH THU BỆNH VIỆN PHỤC VỤ TÍNH KPI 
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
                <TableCell style={((type===1 && row.TrungBinhChoKetQua > row.TieuChuan))? commonStyleLeftReponsiveRed:commonStyleLeftReponsive}>
                  {type === 0
                    ? row.TrungBinhChoThucHien
                    : row.TrungBinhChoKetQua}
                </TableCell>
                <TableCell style={(type===1 && row.MaxChoKetQua >row.TieuChuan)? commonStyleLeftReponsiveRed:commonStyleLeftReponsive}>
                  {type === 0 ? row.MaxThucHien : row.MaxChoKetQua}
                </TableCell>
                <TableCell style={(type===1 && row.MinChoKetQua >row.TieuChuan)? commonStyleLeftReponsiveRed:commonStyleLeftReponsive}>
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

export default TableDoanhThuKPI;
