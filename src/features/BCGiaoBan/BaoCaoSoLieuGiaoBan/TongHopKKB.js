import React from "react";
import {  useSelector } from "react-redux";
import {
 
  Card,
  Typography,
  
  Divider,
  Stack,
 
} from "@mui/material";


function TongHopKKB() {
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
        Khoa khám bệnh
        </Typography>
       
      </Stack>

      <Divider />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "bold" }}
      >
        Tổng khám: {chiso['kkb-TongKham']}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Bảo hiểm :  {chiso['kkb-BaoHiem']}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
     Viện phí:{chiso['kkb-VienPhi']}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
    Yêu cầu: {chiso['kkb-YeuCau']}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Vào viện: {chiso['kkb-NBVaoVien']} 
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Chuyển viện: {chiso['kkb-CVNoiTru'] + chiso['kkb-CVNgoaiTru'] } 
      </Typography>
     
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontStyle: "italic" }}
      >
       Ngoại tỉnh: {chiso['kkb-NgoaiTinhNgoaiTruBH'] + chiso['kkb-NgoaiTinhNgoaiTruVP'] +chiso['kkb-NgoaiTinhNoiTruBH'] + chiso['kkb-NgoaiTinhNoiTruVP']} 
      </Typography>
     
    </Card>
  );
}

export default TongHopKKB;
