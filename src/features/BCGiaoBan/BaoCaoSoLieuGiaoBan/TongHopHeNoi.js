import React from "react";
import {  useSelector } from "react-redux";
import {
  
  Card,
  Typography,
 
  Divider,
  Stack,
 
} from "@mui/material";


function TongHopHeNoi() {
  const {
    noiBNTuvongs,
    noiBNChuyenViens,
    noiBNXinVes,
    noiBNNangs,
    noiBNNgoaiGios,

   
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
        Hệ nội
        </Typography>
       
      </Stack>

      <Divider />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "bold" }}
      >
        Vào viện: {noiBNNgoaiGios.length} 
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Chuyển viện: {noiBNChuyenViens.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
        Tử vong:{noiBNTuvongs.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
    Nặng: {noiBNNangs.length}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Xin về: {noiBNXinVes.length}
      </Typography>
     
    </Card>
  );
}

export default TongHopHeNoi;
