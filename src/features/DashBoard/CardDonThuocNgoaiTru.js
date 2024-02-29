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
  const VND = new Intl.NumberFormat(
    'vi-VN', {
        style: 'currency',
        currency: 'VND',
      }
  )

  data.push({ Name: "Số đơn", Value:chisosObj.ngoaitru_sodonthuoc });
  data.push({ Name: "Đơn cao nhất", Value: VND.format(chisosObj.ngoaitru_max_donthuoc) });
  data.push({ Name: "Khuyến cáo", Value: VND.format(chisosObj.ngoaitru_khuyencao) });
  data.push({ Name: "Bình quân đơn", Value: VND.format(chisosObj.ngoaitru_binhquandon) });
  data.push({ Name: "Tổng tiền", Value: VND.format(chisosObj.ngoaitru_tongtiendonthuoc) });
  data.push({ Name: "Đơn thấp nhất", Value: VND.format(chisosObj.ngoaitru_min_donthuoc) });
  data.push({ Name: "Vượt khuyến cáo", Value: chisosObj.ngoaitru_vuotkhuyencao });
  return (
   
      <Card sx ={{pl:0,pr:1.5}}>
        <Grid container spacing={0.5} margin={0.2}>
          {data &&
            data.map((item, index) => (
              <Grid item xs={12} sm={12} md={3} key={index}>
                <Card
                  sx={{
                    fontWeight: "bold",
                    color: "#f2f2f2",
                    backgroundColor:((item.Name ==="Đơn cao nhất" && chisosObj.ngoaitru_max_donthuoc>chisosObj.ngoaitru_khuyencao
                    || (item.Name ==='Vượt khuyến cáo')
                    ||(item.Name ==='Bình quân đơn' && chisosObj.ngoaitru_binhquandon>chisosObj.ngoaitru_khuyencao)
                    ))
                    ?"#bb1515": "#1939B7",
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
