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
  CardHeader,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataNewestByNgay } from "./dashboardSlice";
import DisplayChiSoDashBoard from "../../components/DisplayChiSoDashBoard";
import CardThoiGian from "./CardThoiGian";
import TableCanLamSang from "./TableCanLamSang";
import StackBarTyLeTraDungCLS from "./StackBarTyLeTraDungCLS";
import { fDateTime, fDateTimeSuffix, formatDateTime } from "../../utils/formatTime";

const DieuHanh = () => {
  const {
    dashboadChiSoChatLuong,
    thoigianchokhambenh,
    thoigiankhambenh,
    tongthoigian,
    canlamsangs,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const dateCurent = new Date().toISOString();

  //     dispatch(getDataNewestByNgay(dateCurent));
  //   }, []);

  useEffect(() => {
    const fetchNewestData = () => {
      const dateCurent = new Date().toISOString();
      dispatch(getDataNewestByNgay(dateCurent));
      console.log("render lại");
    };

    fetchNewestData(); // Gọi khi component mount

    const intervalId = setInterval(fetchNewestData, 60000); // Gọi lại sau mỗi 1 phút

    return () => {
      clearInterval(intervalId); // Dọn dẹp khi component unmount
    };
  }, [dispatch]); // Chỉ rerun khi dispatch thay đổi

  return (
    <Stack>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
            {dashboadChiSoChatLuong.Ngay &&
          <Typography variant="h6" sx={{marginX:'auto',textAlign:'center'}}>(Số liệu {formatDateTime(dashboadChiSoChatLuong.Ngay)})</Typography>
            }
          <Box sx={{ flexGrow: 1 }} />
          <DisplayChiSoDashBoard
            ChiSoDashBoard={dashboadChiSoChatLuong.ChiSoDashBoard}
          />
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
        <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
            {dashboadChiSoChatLuong.Ngay &&
          <Typography variant="h6" sx={{marginX:'auto',textAlign:'center'}}>Ngoại trú</Typography>
            }
          
        </Toolbar>
      </AppBar>
      <Card  sx={{
            fontWeight: "bold",
            color: "#f2f2f2",
            backgroundColor: "#1939B7",
            // p: 1,
            boxShadow: 10,
            borderRadius: 3,
          }}>
            <CardHeader><Typography sx={{textAlign:'center'}}>CardHeader</Typography></CardHeader>
              <CardContent>
                <Typography sx={{textAlign:'center'}}>Tổng khám</Typography>
                <Typography variant="h4" sx={{ textAlign:'center'}}>100</Typography>
              </CardContent>
            </Card>

          <CardThoiGian data={thoigianchokhambenh} />
          
       <StackBarTyLeTraDungCLS/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
            {dashboadChiSoChatLuong.Ngay &&
          <Typography variant="h6" sx={{marginX:'auto',textAlign:'center'}}>Ngoại trú</Typography>
            }
          
        </Toolbar>
      </AppBar>
          <TableCanLamSang canlamsangs={canlamsangs} type={0} />
          
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DieuHanh;
