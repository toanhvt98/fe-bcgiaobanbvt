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
import {
  fDateTime,
  fDateTimeSuffix,
  formatDateTime,
} from "../../utils/formatTime";
import MyPieChart from "../../components/form/MyPieChart";
import CardNgoaiTinhCapCuu from "./CardNgoaiTinhCapCuu";
import CardXuTriKham from "./CardXuTriKham";
import ApexBarChart from "./ApexBarChart";
import { BarChart } from "@mui/x-charts";
import BarAPexChart from "./BarAPexChart";

const colors = [
  { color: "#1939B7" },
  { color: "#bb1515" },
  { color: "#00C49F" },
  { color: "##eb99ff" },
  { color: "#660000" },
  { color: "#00661a" },
  { color: "#0033cc" },
  { color: "#00cc00" },
  { color: "#0088FE" },
  { color: "#FFBB28" },
  { color: "#2ABC28" },
];

const DieuHanh = () => {
  const {
    dashboadChiSoChatLuong,
    thoigianchokhambenh,
    thoigiankhambenh,
    tongthoigian,
    canlamsangs,
    khambenhngoaitru,
    dangdieutrinoitru,
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
          {dashboadChiSoChatLuong.Ngay && (
            <Typography
              variant="h6"
              sx={{ marginX: "auto", textAlign: "center" }}
            >
              (Số liệu {formatDateTime(dashboadChiSoChatLuong.Ngay)})
            </Typography>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <DisplayChiSoDashBoard
            ChiSoDashBoard={dashboadChiSoChatLuong.ChiSoDashBoard}
          />
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} spacing={1}>
        <Card sx={{backgroundColor:"#1D1D1D"}}>
           Ngoại trú
            <CardContent>
              <Grid container spacing={1}>
                {/* Grid items bên trong Card */}
                <Grid item xs={12} sm={12} md={6}>
                  <Card>
                    Đăng ký khám
                    <MyPieChart
                      data={khambenhngoaitru}
                      colors={colors}
                      other={{ height: 175 }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={1.5}>
                  <CardNgoaiTinhCapCuu/>
                </Grid>

                <Grid item xs={12} sm={12} md={4.5}>
                <CardXuTriKham/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
        <Grid item xs={12} sm={12} md={5}> 
        <Card>
            <CardHeader title={"Khám bệnh ngoại trú"} />
            <MyPieChart
              data={khambenhngoaitru}
              colors={colors}
              other={{ height: 150 }}
            />
          </Card>
        </Grid>
          <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar>
              {dashboadChiSoChatLuong.Ngay && (
                <Typography
                  variant="h6"
                  sx={{ marginX: "auto", textAlign: "center" }}
                >
                  Ngoại trú
                </Typography>
              )}
            </Toolbar>
          </AppBar>
          <ApexBarChart/>
          <BarAPexChart/>
          <TableCanLamSang canlamsangs={canlamsangs} type={0} />
        </Grid>


      </Grid>
    </Stack>
  );
};

export default DieuHanh;
