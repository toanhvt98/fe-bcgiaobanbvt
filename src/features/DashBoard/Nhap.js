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
        {/* Wrapper Card cho 3 grid items */}
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <CardHeader title={"Thông tin khám bệnh"} />
            <CardContent>
              <Grid container spacing={1}>
                {/* Grid items bên trong Card */}
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

                <Grid item xs={12} sm={12} md={2}>
                  <Card
                    sx={{
                      fontWeight: "bold",
                      color: "#f2f2f2",
                      backgroundColor: "#1939B7",
                      boxShadow: 10,
                      borderRadius: 3,
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ textAlign: "center" }}>Tổng khám</Typography>
                      <Typography variant="h4" sx={{ textAlign: "center" }}>
                        100
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Phần còn lại của Grid */}
        <Grid item xs={12} sm={12} md={6}>
          {/* Các thành phần khác */}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DieuHanh;
