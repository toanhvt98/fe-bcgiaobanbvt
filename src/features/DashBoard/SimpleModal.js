
import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  commonStyle,
  commonStyleLeft,
  commonStyleTitle,
} from "../../utils/heplFuntion";

function SimpleModal({ isOpen, onClose, children }) {
   const {chitiet_ct128_bhyt_ngoaitru,chitiet_ct128_bhyt_noitru} = useSelector((state)=> state.dashboard)
   const data = [...chitiet_ct128_bhyt_ngoaitru,...chitiet_ct128_bhyt_noitru]
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
 
   let commonStyleTitleReponsive = isSmallScreen
     ? { ...commonStyleTitle, fontSize: "0.8rem" }
     : { ...commonStyleTitle };
   const rowStyle = {
     height: "35px", // Adjust the height as needed
     "& td, & th": { padding: "5px" }, // Adjust the padding as needed
   };
 
    if (!isOpen) return null;
    function formatTimeFromISOString(isoString) {
      const dateObject = new Date(isoString);
      const hours = addLeadingZero(dateObject.getHours());
      const minutes = addLeadingZero(dateObject.getMinutes());
      const seconds = addLeadingZero(dateObject.getSeconds());
      return `${hours}:${minutes}:${seconds}`;
  }
  
  function addLeadingZero(value) {
      return value < 10 ? `0${value}` : value;
  }
    return (
        <>
        <Modal open={isOpen} onClose={onClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80vw",
                maxHeight: "80vh", // Giới hạn chiều cao tối đa
                overflowY: "auto", // Hiển thị thanh cuộn
                bgcolor: theme.palette.background.paper,
                boxShadow: 24,
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography variant="h6" gutterBottom align="center" color={darkMode?"#FFF":"#1939B7"}>
                Danh sách chỉ định CT 128 đối tượng BHYT
              </Typography>
              <Table>
                <TableHead>
                  <TableRow sx={rowStyle}>
                    <TableCell style={commonStyleReponsive}>
                     Khoa
                    </TableCell>

                    <TableCell style={commonStyleReponsive}>
                      Phòng
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Người chỉ định
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Dịch vụ
                    </TableCell>
                    <TableCell style={commonStyleReponsive}>
                      Thời gian
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((row, index) => (
                      <TableRow key={index} sx={rowStyle}>
                        <TableCell style={commonStyleLeftReponsive}>
                          {row.departmentgroupname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.departmentname}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.username}
                        </TableCell>

                        <TableCell style={commonStyleLeftReponsive}>
                          {row.servicepricename}
                        </TableCell>
                        <TableCell style={commonStyleLeftReponsive}>
                          
                          {formatTimeFromISOString(row.maubenhphamdate)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Modal>
        <button onClick={onClose}>Close</button>
    
        </>
     
    );
  }
  export default SimpleModal;