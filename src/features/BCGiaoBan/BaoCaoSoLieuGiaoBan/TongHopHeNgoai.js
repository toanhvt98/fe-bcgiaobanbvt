import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  
  Card,
  Typography,
  
  Divider,
  Stack,
 
} from "@mui/material";
// import { useTheme } from "@emotion/react";
// import { commonStyle, commonStyleLeft } from "../../../utils/heplFuntion";

function TongHopHeNgoai() {
  
  const {
    
    ngoaiBNTuvongs,
    ngoaiBNChuyenViens,
    ngoaiBNXinVes,
    ngoaiBNNangs,
    ngoaiBNPhauThuats,
    ngoaiBNNgoaiGios,

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

      <Divider sx={{mb:1}}/>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
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
        Tử vong: {ngoaiBNTuvongs.length}
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
