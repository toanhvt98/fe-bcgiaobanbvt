
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
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardBenhNhanChuyenVien from "./CardBenhNhanChuyenVien";
function SimpleModal({ isOpen, onClose, children }) {
   const {dashboadChiSoChatLuong} = useSelector((state)=> state.dashboard)
   const ChiSoDashBoard =dashboadChiSoChatLuong.ChiSoDashBoard
     
      const theme = useTheme();
      const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
      
    if (!isOpen) return null;
  
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
              <Typography variant="h6" gutterBottom align="center">
                Danh sách các chỉ số 
              </Typography>
              <Grid
                container
                spacing={3}
                direction={isSmallScreen ? "column" : "row"}
              >
                {ChiSoDashBoard && ChiSoDashBoard.map((ChiSo, index) => (
                  <Grid item xs={isSmallScreen ? 12 : 6} key={index}>
                    <Typography variant="body2"> {ChiSo.Code} : {ChiSo.Value} </Typography>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Modal>
        <button onClick={onClose}>Close</button>
    
        </>
     
    );
  }
  export default SimpleModal;