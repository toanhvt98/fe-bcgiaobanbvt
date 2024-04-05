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

function TableDoanhThuCanLamSang({ canlamsangDuyetKeToan, canlamsangChiDinh }) {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let commonStyleReponsive = isSmallScreen
    ? { ...commonStyle, fontSize: "0.7rem" }
    : { ...commonStyle, fontSize: "0.85rem" };
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

  return (
    <Box sx={{ my: 1 }}>
       <Card  sx={{ fontWeight: 'bold',color: '#f2f2f2',backgroundColor:'#1939B7', p:1,
        boxShadow: 3,borderRadius:3
       }}>
   <Typography sx={{fontSize:isSmallScreen?'1rem' :'1.3rem', textAlign:'center'}} > Tổng hợp cận lâm sàng trong tháng</Typography>
   
   </Card>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* 2 cột đầu tiên chiếm 3 dòng */}
              <TableCell style={commonStyleReponsive} rowSpan={3}>
                STT
              </TableCell>
              <TableCell style={commonStyleReponsive} rowSpan={3}>
                Nhóm cận lâm sàng
              </TableCell>

              {/* Ngoại tỉnh chiếm 1 dòng, sau đó chia làm 2 cột ở dòng tiếp theo */}
              <TableCell style={commonStyleReponsive} colSpan={4}>
                Đã duyệt kế toán
              </TableCell>
              <TableCell style={commonStyleReponsive} colSpan={4}>
               Theo chỉ định
              </TableCell>
            
            </TableRow>
            <TableRow>
              {/* Ngoại tỉnh: Ngoại trú, Nội trú */}
              <TableCell style={commonStyleReponsive}>
                Số lượng
              </TableCell>
              <TableCell style={commonStyleReponsive}>
                BHYT
              </TableCell>
              <TableCell style={commonStyleReponsive}>Đồng chi trả</TableCell>
              <TableCell style={commonStyleReponsive}>
               Thu trực tiếp
              </TableCell>

              <TableCell style={commonStyleReponsive}>Số lượng</TableCell>
              <TableCell style={commonStyleReponsive}>
                BHYT
              </TableCell>
              <TableCell style={commonStyleReponsive}>Đồng chi trả</TableCell>
              <TableCell style={commonStyleReponsive}>
               Thu trực tiếp
              </TableCell>
             
            </TableRow>
            
          </TableHead>
          <TableBody>
            {canlamsangDuyetKeToan.name && canlamsangDuyetKeToan.name.map((row, index) => (
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
                <TableCell style={commonStyleReponsive}>{index+1}</TableCell>
                <TableCell style={commonStyleReponsive}>
                  {row}
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#f3e5f5" }}
                >
                  <Typography>{canlamsangDuyetKeToan.soluong[index]}</Typography>
                 
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#fff9c4" }}
                >
                  <Typography>{VND.format(canlamsangDuyetKeToan.bhyt[index])}</Typography>
                 
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#E2C4C4" }}
                >
                  <Typography>{VND.format(canlamsangDuyetKeToan.dongchitra[index])}</Typography>
                 
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#ccffcc" }}
                >
                  <Typography>{VND.format(canlamsangDuyetKeToan.thutructiep[index])}</Typography>
                 
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#f3e5f5" }}
                >
                  <Typography>{canlamsangChiDinh.soluong[index]}</Typography>
                 
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#fff9c4" }}
                >
                  <Typography>{VND.format(canlamsangChiDinh.bhyt[index])}</Typography>
                 
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#E2C4C4" }}
                >
                  <Typography>{VND.format(canlamsangChiDinh.dongchitra[index])}</Typography>
                 
                </TableCell>
                <TableCell
                  style={commonStyleReponsive}
                  sx={{ backgroundColor: "#ccffcc" }}
                >
                  <Typography>{VND.format(canlamsangChiDinh.thutructiep[index])}</Typography>
                 
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableDoanhThuCanLamSang;
