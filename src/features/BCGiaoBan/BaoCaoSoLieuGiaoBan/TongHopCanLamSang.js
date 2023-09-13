
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";


function TongHopCanLamSang() {
  const {
    chiso
  } = useSelector((state) => state.bcgiaoban);

  return (
    <Card
      sx={{
        alignItems: "center",
        p: 3,
        boxShadow: 3,
        backgroundColor: "#F9FAFB",
      }}
    >
      <Stack direction="row">
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
        Cận lâm sàng
        </Typography>
       
      </Stack>

      <Divider />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "bold" }}
      >
        Xquang: {chiso['cdha-Xquang']}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       CT16 :  {chiso['cdha-CT16']}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
     CT128 :{chiso['cdha-CT128']}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
    MRI : {chiso['cdha-MRI']}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Siêu âm : {chiso['tdcn-SieuAm']} 
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Nội soi : {chiso['tdcn-NoiSoi']} 
      </Typography>
     
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Hóa sinh: {chiso['xn-HoaSinh']} 
      </Typography>
     
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
      Huyết học: {chiso['xn-HuyetHoc']} 
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
     Vi sinh : {chiso['xn-ViSinh']} 
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
    HH truyền máu : {chiso['hhtm-TongXN']} 
      </Typography>
     
    </Card>
  );
}

export default TongHopCanLamSang;
