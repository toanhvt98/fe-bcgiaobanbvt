
import React from "react";
import {  useSelector } from "react-redux";
import {
  
  Card,
  Typography,
 
  Divider,
  Stack,
 
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

      <Divider sx={{mb:1}}/>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
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
