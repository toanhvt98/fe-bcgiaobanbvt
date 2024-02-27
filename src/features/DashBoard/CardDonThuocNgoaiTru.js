import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function CardDonThuocNgoaiTru() {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const { chisosObj } = useSelector((state) => state.dashboard);
  const data = [];
  data.push({ Name: "Số đơn", Value: chisosObj.ngoaitru_chokham });
  data.push({ Name: "Đơn cao nhất", Value: chisosObj.ngoaitru_ketthuckham });
  data.push({ Name: "Khuyến cáo", Value: chisosObj.ngoaitru_chuyenvien });
  data.push({ Name: "Bình quân đơn", Value: chisosObj.ngoaitru_dangkham });
  data.push({ Name: "Tổng tiền", Value: chisosObj.ngoaitru_vaovien });
  data.push({ Name: "Đơn thấp nhất", Value: chisosObj.ngoaitru_vaovien });
  data.push({ Name: "Vượt khuyến cáo", Value: chisosObj.ngoaitru_vaovien });
  return (
   
      <Card>
        <Grid container spacing={0.5} margin={0.2}>
          {data &&
            data.map((item, index) => (
              <Grid item xs={12} sm={12} md={3} key={index}>
                <Card
                  sx={{
                    fontWeight: "bold",
                    color: "#f2f2f2",
                    backgroundColor: "#1939B7",
                    // p: 1,
                    boxShadow: 10,
                    borderRadius: 3,
                    
                  }}
                >
                  <CardContent>
                    <Typography sx={{ textAlign: "center",fontSize:'0.9rem' }}>
                      {item.Name}
                    </Typography>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      {item.Value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Card>
   
  );
}

export default CardDonThuocNgoaiTru;
