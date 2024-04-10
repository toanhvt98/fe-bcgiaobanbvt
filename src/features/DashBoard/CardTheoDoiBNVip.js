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
import CardThongTinBenhNhanVip from "./CardThongTinBenhNhanVip";

function CardTheoDoiBNVip() {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  const { BenhNhan_Vip_Group} = useSelector((state) => state.dashboard);
 
  return (
   
      <Card sx ={{pl:0,pr:1.5}}>
        <Grid container spacing={1.8} margin={0.2}>
          {BenhNhan_Vip_Group &&
            BenhNhan_Vip_Group.map((item, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
               <CardThongTinBenhNhanVip
               databenhnhan={item}
               title={item[0].name}
               value = {item.length}
               titleMore ={`Danh sách bệnh nhân là ${item[0].name}`}
               />
              </Grid>
            ))}
        </Grid>
        
      </Card>
   
  );
}

export default CardTheoDoiBNVip;
