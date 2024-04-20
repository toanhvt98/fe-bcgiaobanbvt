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

function TableDoanhThuBacSiKhoa({ doanhthu, type, doanhthutong }) {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let commonStyleReponsive = isSmallScreen
    ? { ...commonStyle, fontSize: "0.7rem",zIndex:100 }
    : { ...commonStyle, fontSize: "0.85rem",zIndex:100 };
  let commonStyleLeftReponsive = isSmallScreen
    ? { ...commonStyleLeft, fontSize: "0.7rem" }
    : { ...commonStyleLeft, fontSize: "0.85rem" };
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

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const styles = {
    stickyColumn: {
      position: 'sticky',
      left: 0,
      background: 'white',
      zIndex: 1,
    },
    stickyColumnSecond: {
      position: 'sticky',
      left: 50,  // Giả định rằng chiều rộng của cột đầu tiên là 50px
      background: 'white',
      zIndex: 1,
    },
    tableContainer: {
      overflowX: 'auto',
    },
    commonStyleReponsive: isSmallScreen
      ? { fontSize: "0.7rem", padding: "8px" }
      : { fontSize: "0.85rem", padding: "10px" },
  };
  
  return (
    <Box sx={{ my: 1 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* 2 cột đầu tiên chiếm 3 dòng */}
              <TableCell style={{ ...commonStyleReponsive, ...styles.stickyColumn }} rowSpan={3}>
                STT
              </TableCell>
              <TableCell style={{ ...commonStyleReponsive, ...styles.stickyColumnSecond }} rowSpan={3}>
                KHOA PHÒNG
              </TableCell>

              {/* Ngoại tỉnh chiếm 1 dòng, sau đó chia làm 2 cột ở dòng tiếp theo */}
             
              <TableCell style={commonStyleReponsive} colSpan={3}>
                Tổng thu
              </TableCell>
              <TableCell style={commonStyleReponsive} colSpan={3}>
                BHYT
              </TableCell>
              <TableCell style={commonStyleReponsive} colSpan={3}>
                Thu trực tiếp
              </TableCell>

              <TableCell style={commonStyleReponsive} rowSpan={3}>
                Doanh thu MRI 3.0
              </TableCell>
            </TableRow>
 
            <TableRow>
              {/* Ngoại tỉnh: Ngoại trú, Nội trú */}
              
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
                       
{/* Row tong cho table */}
            {doanhthutong && (
              <TableRow style={{ backgroundColor: "#CDF5BC" }}>
                <TableCell colSpan={2} style={{ ...commonStyleReponsive, ...styles.stickyColumn}}>
                  Tổng cộng
                </TableCell>

                <TableCell style={commonStyleReponsive}>
                  <Typography> {VND.format(doanhthutong.TongTien)}</Typography>
                  {doanhthutong.ChenhLech_TongTien !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          doanhthutong.ChenhLech_TongTien > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {doanhthutong.ChenhLech_TongTien > 0
                        ? `+${VND.format(doanhthutong.ChenhLech_TongTien)}`
                        : VND.format(doanhthutong.ChenhLech_TongTien)}
                    </Typography>
                  )}
                </TableCell>
             
                <TableCell style={commonStyleReponsive}>
                <Typography> {doanhthutong.TyLe_ThucTe_DoanhThu_KhuyenCao}%</Typography>
                  {doanhthutong.TyLe_ThucTe_DoanhThu_KhuyenCao_ChenhLech !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          doanhthutong.TyLe_ThucTe_DoanhThu_KhuyenCao_ChenhLech > 0
                            ? "green"
                            : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {doanhthutong.TyLe_ThucTe_DoanhThu_KhuyenCao_ChenhLech > 0
                        ? `+${doanhthutong.TyLe_ThucTe_DoanhThu_KhuyenCao_ChenhLech}`
                        : doanhthutong.TyLe_ThucTe_DoanhThu_KhuyenCao_ChenhLech}
                      %
                    </Typography>
                  )}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                <Typography> {VND.format(doanhthutong.BHYT)}</Typography>
                  {doanhthutong.ChenhLech_BHYT !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          doanhthutong.ChenhLech_BHYT > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {doanhthutong.ChenhLech_BHYT > 0
                        ? `+${VND.format(doanhthutong.ChenhLech_BHYT)}`
                        : VND.format(doanhthutong.ChenhLech_BHYT)}
                    </Typography>
                  )}
                </TableCell>
               
                <TableCell style={commonStyleReponsive}>
                <Typography> {doanhthutong.TyLe_ThucTe_BHYT_KhuyenCao}%</Typography>
                  {doanhthutong.TyLe_ThucTe_BHYT_KhuyenCao_ChenhLech !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          doanhthutong.TyLe_ThucTe_BHYT_KhuyenCao_ChenhLech > 0
                            ? "green"
                            : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {doanhthutong.TyLe_ThucTe_BHYT_KhuyenCao_ChenhLech > 0
                        ? `+${doanhthutong.TyLe_ThucTe_BHYT_KhuyenCao_ChenhLech}`
                        : doanhthutong.TyLe_ThucTe_BHYT_KhuyenCao_ChenhLech}
                      %
                    </Typography>
                  )}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                <Typography> {VND.format(doanhthutong.ThuTrucTiep)}</Typography>
                  {doanhthutong.ChenhLech_ThuTrucTiep !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          doanhthutong.ChenhLech_ThuTrucTiep > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {doanhthutong.ChenhLech_ThuTrucTiep > 0
                        ? `+${VND.format(doanhthutong.ChenhLech_ThuTrucTiep)}`
                        : VND.format(doanhthutong.ChenhLech_ThuTrucTiep)}
                    </Typography>
                  )}
                </TableCell>
            
                <TableCell style={commonStyleReponsive}>
                <Typography> {doanhthutong.TyLe_ThucTe_ThuTrucTiep_KhuyenCao}%</Typography>
                  {doanhthutong.TyLe_ThucTe_ThuTrucTiep_KhuyenCao_ChenhLech !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          doanhthutong.TyLe_ThucTe_ThuTrucTiep_KhuyenCao_ChenhLech > 0
                            ? "green"
                            : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {doanhthutong.TyLe_ThucTe_ThuTrucTiep_KhuyenCao_ChenhLech > 0
                        ? `+${doanhthutong.TyLe_ThucTe_ThuTrucTiep_KhuyenCao_ChenhLech}`
                        : doanhthutong.TyLe_ThucTe_ThuTrucTiep_KhuyenCao_ChenhLech}
                      %
                    </Typography>
                  )}
                </TableCell>
                <TableCell style={commonStyleReponsive}>
                <Typography> {VND.format(doanhthutong.MRI30)}</Typography>
                  {doanhthutong.ChenhLech_MRI30 !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          doanhthutong.ChenhLech_MRI30 > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {doanhthutong.ChenhLech_MRI30 > 0
                        ? `+${VND.format(doanhthutong.ChenhLech_MRI30)}`
                        : VND.format(doanhthutong.ChenhLech_MRI30)}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            )}


            {doanhthu.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: darkMode
                    ? index % 2 === 0
                      ? "#424242"
                      : "#616161" // Màu cho chế độ tối
                    : index % 2 === 0
                    ? "#f2f2f2"
                    : "#e0e0e0", // Màu cho chế độ sáng
                }}
              >
                <TableCell style={{ ...commonStyleReponsive, ...styles.stickyColumn}}>{row.STT}</TableCell>
                <TableCell style={{ ...commonStyleReponsive, ...styles.stickyColumnSecond }}>
                  {row.TenKhoa}
                </TableCell>
              
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#ccffcc" }}
                >
                  <Typography> {VND.format(row.TongThu)}</Typography>
                  {row.ChenhLech_TongThu !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: row.ChenhLech_TongThu > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {row.ChenhLech_TongThu > 0
                        ? `+${VND.format(row.ChenhLech_TongThu)}`
                        : VND.format(row.ChenhLech_TongThu)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#fff9c4" }}
                >
                  {VND.format(row.KC_DoanhThu)}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#f3e5f5" }}
                >
                  <Typography> {row.TyLe_DoanhThu_KC}%</Typography>
                  {row.ChenhLech_TyLe_DoanhThu_KC !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: row.TyLe_DoanhThu_KC > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {row.ChenhLech_TyLe_DoanhThu_KC > 0
                        ? `+${row.ChenhLech_TyLe_DoanhThu_KC}`
                        : row.ChenhLech_TyLe_DoanhThu_KC}
                      %
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#ccffcc" }}
                >
                  <Typography> {VND.format(row.BHYT)}</Typography>
                  {row.ChenhLech_BHYT !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: row.ChenhLech_BHYT > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {row.ChenhLech_BHYT > 0
                        ? `+${VND.format(row.ChenhLech_BHYT)}`
                        : VND.format(row.ChenhLech_BHYT)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#fff9c4" }}
                >
                  {VND.format(row.BHYT_KC)}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#f3e5f5" }}
                >
                  <Typography> {row.TyLe_BHYT_KC}%</Typography>
                  {row.ChenhLech_TyLe_BHYT_KC !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: row.ChenhLech_TyLe_BHYT_KC > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {row.ChenhLech_TyLe_BHYT_KC > 0
                        ? `+${row.ChenhLech_TyLe_BHYT_KC}`
                        : row.ChenhLech_TyLe_BHYT_KC}
                      %
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#ccffcc" }}
                >
                  <Typography> {VND.format(row.ThuTrucTiep)}</Typography>
                  {row.ChenhLech_ThuTrucTiep !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: row.ChenhLech_ThuTrucTiep > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {row.ChenhLech_ThuTrucTiep > 0
                        ? `+${VND.format(row.ChenhLech_ThuTrucTiep)}`
                        : VND.format(row.ChenhLech_ThuTrucTiep)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#fff9c4" }}
                >
                  {VND.format(row.ThuTrucTiep_KC)}
                </TableCell>{" "}
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#f3e5f5" }}
                >
                  <Typography> {row.TyLe_ThuTrucTiep_KC}%</Typography>
                  {row.ChenhLech_TyLe_ThuTrucTiep_KC !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color:
                          row.ChenhLech_TyLe_ThuTrucTiep_KC > 0
                            ? "green"
                            : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {row.ChenhLech_TyLe_ThuTrucTiep_KC > 0
                        ? `+${row.ChenhLech_TyLe_ThuTrucTiep_KC}`
                        : row.ChenhLech_TyLe_ThuTrucTiep_KC}
                      %
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#E2C4C4" }}
                >
                  <Typography> {VND.format(row.MRI30)}</Typography>
                  {row.ChenhLech_MRI30 !== 0 && (
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: row.ChenhLech_MRI30 > 0 ? "green" : "red",
                        display: "block", // Đảm bảo giá trị được hiển thị trên một dòng mới
                      }}
                    >
                      {/* Kiểm tra giá trị chênh lệch để thêm dấu + hoặc - */}
                      {row.ChenhLech_MRI30 > 0
                        ? `+${VND.format(row.ChenhLech_MRI30)}`
                        : VND.format(row.ChenhLech_MRI30)}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableDoanhThuBacSiKhoa;
