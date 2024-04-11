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
import TwoLevelPieChart from "./TwoLevelPieChart";
import MyPieChart from "../../components/form/MyPieChart";

function CardPhongThucHienCanLamSang({phongthuchien,title1, data1,data2,data3}) {
  const theme = useTheme();
  const { darkMode } = useSelector((state) => state.mytheme);
  
  const {
    dashboadChiSoChatLuong,
    thoigianchokhambenh,
    thoigiankhambenh,
    tongthoigian,
    canlamsangs,
    khambenhngoaitru,
    dangdieutrinoitru,
    chisosObj,
    giuongconglap,
    giuongyeucau,
  } = useSelector((state) => state.dashboard);

  const colors = [
    { color: "#1939B7" },
    { color: "#bb1515" },
    { color: "#00C49F" },
    { color: "#eb99ff" },
    { color: "#660000" },
    { color: "#00661a" },
    { color: "#0033cc" },
    { color: "#00cc00" },
    { color: "#0088FE" },
    { color: "#FFBB28" },
    { color: "#2ABC28" },
  ];
  
  const data4 = [
    { label: 'Yêu cầu', value: phongthuchien.noitru.YC.ChiDinh+ phongthuchien.noitru.YC.DaTraKQ +phongthuchien.noitru.YC.DaThucHien||0,color: "#1939B7" },
  { label: 'Viện phí', value: phongthuchien.noitru.VP.ChiDinh+ phongthuchien.noitru.VP.DaTraKQ +phongthuchien.noitru.VP.DaThucHien||0,color: "#bb1515" },
  { label: 'BHYT', value: phongthuchien.noitru.BHYT.ChiDinh+ phongthuchien.noitru.BHYT.DaTraKQ +phongthuchien.noitru.BHYT.DaThucHien||0,color: "#00cc00"},
  { label: 'BHYT + BHYT', value: phongthuchien.noitru.BHYTYC.ChiDinh+ phongthuchien.noitru.BHYTYC.DaTraKQ +phongthuchien.noitru.BHYTYC.DaThucHien||0,color: "#FFBB28" },
  ];

const data5 = [
    { label: 'Yêu cầu-Chờ thực hiện', value: phongthuchien.noitru.YC.ChiDinh ||0,color: "#1939B7" },
    { label: 'Yêu cầu-Đã thực hiện', value: phongthuchien.noitru.YC.DaThucHien ||0,color: "#bb1515" },
    { label: 'Yêu cầu-Đã trả KQ', value: phongthuchien.noitru.YC.DaTraKQ ||0,color: "#00cc00" },

    { label: 'Viện phí-Chờ thực hiện', value: phongthuchien.noitru.VP.ChiDinh ||0,color: "#1939B7" },
    { label: 'Viện phí-Đã thực hiện', value: phongthuchien.noitru.VP.DaThucHien ||0,color: "#bb1515" },
    { label: 'Viện phí-Đã trả KQ', value: phongthuchien.noitru.VP.DaTraKQ ||0,color: "#00cc00" },

    
    { label: 'BHYT-Chờ thực hiện', value: phongthuchien.noitru.BHYT.ChiDinh ||0,color: "#1939B7" },
    { label: 'BHYT-Đã thực hiện', value: phongthuchien.noitru.BHYT.DaThucHien ||0,color: "#bb1515" },
    { label: 'BHYT-Đã trả KQ', value: phongthuchien.noitru.BHYT.DaTraKQ ||0,color: "#00cc00" },

    
    { label: '(BHYT+YC)-Chờ thực hiện', value: phongthuchien.noitru.BHYTYC.ChiDinh ||0,color: "#1939B7" },
    { label: '(BHYT+YC)-Đã thực hiện', value: phongthuchien.noitru.BHYTYC.DaThucHien ||0,color: "#bb1515" },
    { label: '(BHYT+YC)-Đã trả KQ', value: phongthuchien.noitru.BHYTYC.DaTraKQ ||0,color: "#00cc00" },

    
    
]
  return (
    <Card sx={{
        fontWeight: "bold",
        color: "#f2f2f2",
        backgroundColor: "#1939B7",
        // p: 1,
        boxShadow: 10,
        borderRadius: 1,
        m:0.5
      }}>
        {title1}
     <Grid container spacing={2}>
     <Grid item xs={12} sm={12} md={6} spacing={1}>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md ={6}>
                <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
         
          boxShadow: 10,
          borderRadius: 3,
          m:0.5
        }}
      >
        <Typography textAlign={'center'}> Tổng hợp theo loại đối tượng </Typography>
        <CardContent>
          
          <TwoLevelPieChart 
          data1 ={data1}
          data2={data2}
          />
         
        </CardContent>
      </Card>
            </Grid>
            <Grid item xs={12} sm={12} md ={6}>
            <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
         
          boxShadow: 10,
          borderRadius: 3,
          m:0.5
        }}
      >
        <Typography textAlign={'center'}> Trạng thái </Typography>
        <CardContent>
          
        <MyPieChart
                            data={data3}
                            colors={colors}
                            other={{ height: 300 }}
                          />
         
        </CardContent>
      </Card>
            </Grid>
        </Grid>
     
     </Grid>

     <Grid item xs={12} sm={12} md={6} spacing={1}>
     <Card
        sx={{
          fontWeight: "bold",
          color: "#f2f2f2",
          backgroundColor: "#1939B7",
          // p: 1,
          boxShadow: 10,
          borderRadius: 3,
          m:0.5,
          
        }}
      >
        <CardContent>
          <Typography sx={{ textAlign: "center",fontSize:"0.8rem" }}>Ngoại tỉnh</Typography>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {chisosObj.ngoaitru_ngoaitinh}
          </Typography>
        </CardContent>
      </Card>
     </Grid>
     </Grid>
     
      

      

    </Card>
  );
}

export default CardPhongThucHienCanLamSang;
