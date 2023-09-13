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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { commonStyle, commonStyleLeft } from "../../../utils/heplFuntion";

function TongHopHeNgoai() {
  
  const {
    noiBNTuvongs,
    noiBNChuyenViens,
    noiBNXinVes,
    noiBNNangs,
    noiBNNgoaiGios,

    ngoaiBNTuvongs,
    ngoaiBNChuyenViens,
    ngoaiBNXinVes,
    ngoaiBNNangs,
    ngoaiBNPhauThuats,
    ngoaiBNNgoaiGios,

    clcBNTuvongs,
    clcBNChuyenViens,
    clcBNXinVes,
    clcBNNangs,
    hsccycBNNgoaiGios,
    noiycBNNgoaiGios,
    ngoaiycBNNgoaiGios,
    ngoaiycBNPhauThuats,
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
          Hệ ngoại
        </Typography>
      </Stack>

      <Divider />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "bold" }}
      >
        Vào viện: {ngoaiBNNgoaiGios.length}
      </Typography>
      
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Chuyển viện: {ngoaiBNChuyenViens.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Tử vong:{ngoaiBNTuvongs.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Nặng: {ngoaiBNNangs.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Xin về: {ngoaiBNXinVes.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Phẫu thuật: {ngoaiBNPhauThuats.length}
      </Typography>
    </Card>
  );
}

export default TongHopHeNgoai;
