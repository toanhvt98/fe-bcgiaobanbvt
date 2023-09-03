import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
  Container,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { removeBenhNhanInList } from "../BaoCaoNgay/baocaongaySlice";
import BenhNhanEditForm from "./BenhNhanEditForm";
import { getTextFromNumber } from "../../utils/heplFuntion";

// import useAuth from "../../hooks/useAuth";
// import ActionButton from "./ActionButton";

function BenhNhanInBaoCao({ benhnhan, tenkhoa, loaibenhnhan }) {
  const {
    TenBenhNhan,
    Tuoi,
    DiaChi,
    LoaiBN,
    VaoVien,
    GioiTinh,
    LyDoVV,
    DienBien,
    ChanDoan,
    XuTri,
    HienTai,
    TenKhoa,
    Images,
    Stt,
  } = benhnhan;

  return (
    <Container sx={{my:1}}>
      <Paper elevation={3} sx={{ backgroundColor: "#f2f2f2", p: 3 }}>
        {/* Tiêu đề */}
        <Typography variant="h6" sx={{ color: "#004d99", marginBottom: 1,fontWeight: "bold" }}>
          Bệnh nhân {getTextFromNumber(LoaiBN)}
        </Typography>

        {/* Đường phân tách */}
        <Divider sx={{ marginBottom: 2 }} />

        {/* Nội dung */}
        <Grid container spacing={1}>
          {/* Cột bên trái */}
          <Grid item xs={12} sm={1.2}>
            <Typography variant="body2" sx={{ fontSize:"1.05rem",wordWrap: "break-word",textAlign:'center',alignItems:'center',color: "#004d99",fontWeight: "bold" }}>
            {TenKhoa}
            </Typography>
          </Grid>

          {/* Đường phân tách dọc (chỉ hiển thị ở kích thước màn hình sm trở lên) */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />

          {/* Cột bên phải */}
          <Grid item xs={12} sm={9.8}>
            {/* Tên bệnh nhân */}
            {/* <Typography variant="h6" sx={{ color: "#ff0000", marginBottom: 2 }}>
              1. Nguyễn Huy Hoàng 
            </Typography> */}
             <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "#004d99",fontSize:"1.03rem" }}
        >
          {Stt}. {TenBenhNhan} - {GioiTinh}- {Tuoi} tuổi - {DiaChi}
        </Typography>
            <Divider />
            {/* Nội dung khác */}
            <Typography
              variant="body2"
              sx={{ color: "#004d99", fontStyle: "italic",fontSize:"1.03rem" }}
            >
              - Vaò viện: {VaoVien}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#004d99", fontStyle: "italic",fontSize:"1.03rem" }}
            >
              - Lý do vào viện: {LyDoVV}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#004d99", fontStyle: "italic",fontSize:"1.03rem" }}
            >
              - Diễn biến: {DienBien}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#004d99", fontStyle: "italic",fontSize:"1.03rem" }}
            >
              - Chẩn đoán: {ChanDoan}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#004d99", fontStyle: "italic",fontSize:"1.03rem" }}
            >
              - Xử trí: {XuTri}
            </Typography>
            <Typography variant="body2" sx={{ color: "#004d99",fontStyle: "italic",fontSize:"1.03rem" }}>
              - Hiện tại: {HienTai}
            </Typography>
          </Grid>
        </Grid>
        <ImageList cols={2}>
      {benhnhan.Images.length >0 && (benhnhan.Images.map((item,index) => (
        <ImageListItem key={index}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={`Ảnh-${index}`}
            loading="lazy"
          />
        </ImageListItem>
      )))}
    </ImageList>
      </Paper>
    </Container>
  );
}

export default BenhNhanInBaoCao;
