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
  Box,
} from "@mui/material";
import { commonStyle, commonStyleLeft } from "../../utils/heplFuntion";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";

function TableDoanhThuKPI({ doanhthu, type }) {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let commonStyleReponsive = isSmallScreen
    ? { ...commonStyle, fontSize: "0.7rem" }
    : { ...commonStyle,fontSize: "0.85rem" };
  let commonStyleLeftReponsive = isSmallScreen
    ? { ...commonStyleLeft, fontSize: "0.7rem" }
    : { ...commonStyleLeft,fontSize: "0.85rem" };
  commonStyleReponsive = darkMode
    ? { ...commonStyleReponsive, color: "#FFF" }
    : { ...commonStyleReponsive };
  commonStyleLeftReponsive = darkMode
    ? { ...commonStyleLeftReponsive, color: "#FFF" }
    : { ...commonStyleLeftReponsive };

  const commonStyleLeftReponsiveRed = {
    ...commonStyleLeftReponsive,
    color: "#bb1515",
  };
  const rowStyle = {
    height: "35px", // Adjust the height as needed
    "& td, & th": { padding: "5px" }, // Adjust the padding as needed
  };

  const VND = new Intl.NumberFormat(
    'vi-VN', {
        style: 'currency',
        currency: 'VND',
      }
  )

  return (
    <Box sx={{ my: 1 }}>
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
          <Typography
            sx={{
              textAlign: "center",
              fontSize: isSmallScreen ? "1rem" : "1.3rem",
            }}
          >
            DỰ KIẾN DOANH THU BỆNH VIỆN PHỤC VỤ TÍNH KPI (Đã duyệt kế toán)
          </Typography>
        </Card>
        <Table>
          <TableHead>
            <TableRow>
              {/* 2 cột đầu tiên chiếm 3 dòng */}
              <TableCell style={commonStyleReponsive} rowSpan={3}>
                STT
              </TableCell>
              <TableCell style={commonStyleReponsive} rowSpan={3}>
                KHOA PHÒNG
              </TableCell>

              {/* Ngoại tỉnh chiếm 1 dòng, sau đó chia làm 2 cột ở dòng tiếp theo */}
              <TableCell style={commonStyleReponsive} colSpan={4}>
                Tỷ lệ TTT,BHYT/DT khoa
              </TableCell>
              <TableCell style={commonStyleReponsive} colSpan={3}>
                Tổng thu
              </TableCell>
              <TableCell style={commonStyleReponsive} colSpan={3}>
                BHYT
              </TableCell>
              <TableCell style={commonStyleReponsive} colSpan={3}>
                Thu trực tiếp
              </TableCell>
            </TableRow>
            <TableRow>
              {/* Ngoại tỉnh: Ngoại trú, Nội trú */}
              <TableCell style={commonStyleReponsive}>
                Thực tế BHYT/DT
              </TableCell>
              <TableCell style={commonStyleReponsive}>
                Khuyến cáo BHYT/DT khoa
              </TableCell>
              <TableCell style={commonStyleReponsive}>Thực tế TTT/DT</TableCell>
              <TableCell style={commonStyleReponsive}>
                Khuyến cáo TTT/DT
              </TableCell>

              <TableCell style={commonStyleReponsive}>TỔNG THU</TableCell>
              <TableCell style={commonStyleReponsive}>
                Khuyến cáo DT khoa
              </TableCell>
              <TableCell style={commonStyleReponsive}>
                Tỷ lệ thực tế DT/ Khuyến cáo
              </TableCell>

              <TableCell style={commonStyleReponsive}>Cộng tháng</TableCell>
              <TableCell style={commonStyleReponsive}>Khuyến cáo</TableCell>
              <TableCell style={commonStyleReponsive}>
                Tỷ lệ thực tế / Khuyến cáo
              </TableCell>

              <TableCell style={commonStyleReponsive}>Cộng tháng</TableCell>
              <TableCell style={commonStyleReponsive}>Khuyến cáo</TableCell>
              <TableCell style={commonStyleReponsive}>
                Tỷ lệ thực tế / Khuyến cáo
              </TableCell>
            </TableRow>
            <TableRow>
              {/* Ngoại trú: Bảo hiểm, Viện phí */}
              <TableCell style={commonStyleReponsive}>(12)=(6)/(3)</TableCell>
              <TableCell style={commonStyleReponsive}>(13)</TableCell>
              <TableCell style={commonStyleReponsive}>(14)=(9)/(3)</TableCell>
              <TableCell style={commonStyleReponsive}>(15)</TableCell>

              <TableCell style={commonStyleReponsive}>(3)</TableCell>
              <TableCell style={commonStyleReponsive}>(4)</TableCell>
              <TableCell style={commonStyleReponsive}>(5)=(3)/(4)</TableCell>

              <TableCell style={commonStyleReponsive}>(6)</TableCell>
              <TableCell style={commonStyleReponsive}>(7)</TableCell>
              <TableCell style={commonStyleReponsive}>(8)=(6)/(7)</TableCell>

              <TableCell style={commonStyleReponsive}>(9)</TableCell>
              <TableCell style={commonStyleReponsive}>(10)</TableCell>
              <TableCell style={commonStyleReponsive}>(11)=(9)/(10)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doanhthu.map((row, index) => (
              <TableRow key={index}
              sx={{
                backgroundColor: darkMode
                  ? (index % 2 === 0 ? "#424242" : "#616161") // Màu cho chế độ tối
                  : (index % 2 === 0 ? "#f2f2f2" : "#e0e0e0"), // Màu cho chế độ sáng
              }}>
                <TableCell style={commonStyleReponsive}>
                  {row.STT}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {row.TenKhoa}
                </TableCell>

                <TableCell style={commonStyleReponsive}>
                  {row.ThucTe_TyLe_BHYT_DT}%
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {row.KC_TyLe_BHYT_DT}%
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {row.ThucTe_TyLe_TTT_DT}%
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {row.KC_TyLe_TTT_DT}%
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {VND.format(row.TongThu)}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {VND.format(row.KC_DoanhThu)}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {row.TyLe_DoanhThu_KC}%
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {VND.format(row.BHYT)}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {VND.format(row.BHYT_KC)}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {row.TyLe_BHYT_KC}%
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                  {VND.format(row.ThuTrucTiep)}
                </TableCell> 
                <TableCell style={commonStyleReponsive}>
                  {VND.format(row.ThuTrucTiep_KC)}
                </TableCell> <TableCell style={commonStyleReponsive}>
                  {row.TyLe_ThuTrucTiep_KC}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableDoanhThuKPI;
