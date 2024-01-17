import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataNewestByNgay } from "./dashboardSlice";
import DisplayChiSoDashBoard from "../../components/DisplayChiSoDashBoard";
import CardThoiGian from "./CardThoiGian";
import TableCanLamSang from "./TableCanLamSang";

const ChiSoChatLuong = () => {
  // Dữ liệu giả định, thay thế bằng dữ liệu thực từ server hoặc API
  const data = [
    { name: "Bệnh nhân đăng ký khám", value: "800" },
    { name: "Bệnh nhân đã gọi khám", value: "250" },
    { name: "Chờ trung bình khám toàn viện", value: "20 phút" },
    { name: "Chờ lâu nhất", value: "45 phút" },
    { name: "Chờ nhanh nhất", value: "45 phút" },

    // Thêm các chỉ số khác tương tự
  ];
  const { dashboadChiSoChatLuong,thoigianchokhambenh,thoigiankhambenh,tongthoigian,canlamsangs } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    const dateCurent = new Date().toISOString();

    dispatch(getDataNewestByNgay(dateCurent));
  }, []);
  return (
    <Stack>
         <AppBar position="static" sx={{ mb: 3 }}>
                <Toolbar>
                    <Typography variant="h6">THỜI GIAN CHỜ KHÁM BỆNH</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <DisplayChiSoDashBoard ChiSoDashBoard ={dashboadChiSoChatLuong.ChiSoDashBoard}/>
                </Toolbar>
            </AppBar>
{/*       
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={4} md={2} key={index}>
            <Card>
              <CardContent>
                <Typography>{item.name}</Typography>
                <Typography variant="h6">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6">THỜI GIAN KHÁM BỆNH BÁC SĨ</Typography>
        </Toolbar>
      </AppBar> */}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={5.5}>
          <CardThoiGian data={thoigianchokhambenh}/>
          <CardThoiGian data={thoigiankhambenh}/>
          <CardThoiGian data={thoigianchokhambenh}/>
                  </Grid>
        <Grid item xs={12} sm={4} md={6.5}>
          <TableCanLamSang canlamsangs={canlamsangs} type={0}/>
          <TableCanLamSang canlamsangs={canlamsangs} type={1}/>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChiSoChatLuong;
