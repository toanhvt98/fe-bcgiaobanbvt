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
import CardThongTinBenhNhan from "./CardThongTinBenhNhan";

function CardBenhNhanVip() {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const { chisosObj,bndonthuocmax,bndonthuocmin,bnvuotkhuyencao } = useSelector((state) => state.dashboard);
  const data = [];
  const VND = new Intl.NumberFormat(
    'vi-VN', {
        style: 'currency',
        currency: 'VND',
      }
  )

  
  const CardShowDataName = ["Đơn cao nhất","Đơn thấp nhất","Vượt khuyến cáo"]

  const SetTitleMore=(name)=>{
    switch (name) {
      case 'Vượt khuyến cáo':
          return `Danh sách bệnh nhân chỉ định đơn thuốc vượt khuyến cáo`;
      case "Đơn cao nhất":
          return "Bệnh nhân chỉ định đơn thuốc cao nhất";
      case "Đơn thấp nhất":
          return "Bệnh nhân chỉ định đơn thuốc thấp nhất";
      // Thêm các trường case khác nếu cần
      default:
          return "";
  }
  }
  return (
   
      <Card sx ={{pl:0,pr:1.5}}>
        <Grid container spacing={1.8} margin={0.2}>
          {data &&
            data.map((item, index) => (
              <Grid item xs={12} sm={12} md={3} key={index}>
                {CardShowDataName.includes(item.Name)?(
                    <CardThongTinBenhNhan databenhnhan={item.data} 
                    title={item.Name} value ={item.Value} 
                    titleMore={SetTitleMore(item.Name)}
                    colorCardWarning={(item.Name ==='Gây rối')}/>
                ):(
                <Card
                  sx={{
                    fontWeight: "bold",
                    color: "#f2f2f2",
                    backgroundColor:"#1939B7",
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
                )}
              </Grid>
            ))}
        </Grid>
        
      </Card>
   
  );
}

export default CardBenhNhanVip;
