import React from "react";
import {  useSelector } from "react-redux";
import {
 
  Card,
  Typography,
 
  Divider,
  Stack,
 
} from "@mui/material";

function TongHopToanVien() {
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
         Toàn viện 
        </Typography>
      </Stack>

      <Divider sx={{mb:1}}/>
      
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Vào viện: {hsccycBNNgoaiGios.length + noiycBNNgoaiGios.length + ngoaiycBNNgoaiGios.length +noiBNNgoaiGios.length +ngoaiBNNgoaiGios.length}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Chuyển viện: {clcBNChuyenViens.length +noiBNChuyenViens.length +ngoaiBNChuyenViens.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Tử vong: {clcBNTuvongs.length + noiBNTuvongs.length + ngoaiBNTuvongs.length}
      </Typography>
      <Divider sx={{mb:1}}/>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Nặng: {clcBNNangs.length +noiBNNangs.length + ngoaiBNNangs.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Xin về: {clcBNXinVes.length +noiBNXinVes.length +ngoaiBNXinVes.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Phẫu thuật: {ngoaiycBNPhauThuats.length + ngoaiBNPhauThuats.length}
      </Typography>
    </Card>
  );
}

export default TongHopToanVien;
