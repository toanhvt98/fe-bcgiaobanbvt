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
import CardXuTriNoiTru from "./CardXuTriNoiTru";

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

const DieuHanh = () => {
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
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const dateCurent = new Date().toISOString();

  //     dispatch(getDataNewestByNgay(dateCurent));
  //   }, []);
  const dataCLSNoiTru = [];
  dataCLSNoiTru.push(chisosObj.xn_noitru);
  dataCLSNoiTru.push(chisosObj.xq_noitru);
  dataCLSNoiTru.push(chisosObj.ct_noitru);
  dataCLSNoiTru.push(chisosObj.mri_noitru);
  dataCLSNoiTru.push(chisosObj.sa_noitru);
  dataCLSNoiTru.push(chisosObj.cnhh_noitru);
  dataCLSNoiTru.push(chisosObj.mdlx_noitru);
  dataCLSNoiTru.push(chisosObj.ns_noitru);
  dataCLSNoiTru.push(chisosObj.dn_noitru);
  dataCLSNoiTru.push(chisosObj.dt_noitru);

  const dataCLSNgoaiTru = [];
  dataCLSNgoaiTru.push(chisosObj.xn_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.xq_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.ct_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.mri_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.sa_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.cnhh_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.mdlx_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.ns_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.dn_ngoaitru);
  dataCLSNgoaiTru.push(chisosObj.dt_ngoaitru);

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
          <Card sx={{ backgroundColor: "#1D1D1D" }}>
          <CardHeader title={"Ngoại trú"} />
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
                  <CardNgoaiTinhCapCuu />
                </Grid>

                <Grid item xs={12} sm={12} md={4.5}>
                  <CardXuTriKham />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Card>
                  <Typography sx={{ fontSize:'1.2rem' }}>
                      
                      Cận lâm sàng ngoại trú
                      </Typography>
                    <BarAPexChart
                      data={dataCLSNgoaiTru}
                      categories={[
                        "Xét nghiệm",
                        "XQuang",
                        "CT SCanner",
                        "MRI",
                        "Siêu âm",
                        "Đo chức năng hô hấp",
                        "Đo mật độ loãng xương",
                        "Nội soi",
                        "Điện não đồ",
                        "Điện tim đồ",
                      ]}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader title={"Đơn thuốc ngoại trú"} />
                   
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Hiển thị nội trú */}
        <Grid item xs={12} sm={12} md={6} spacing={1}>
          <Card sx={{ backgroundColor: "#1D1D1D" }}>
          <CardHeader title={"Nội trú"} />
            <CardContent>
              <Grid container spacing={1}>
                {/* Grid items bên trong Card */}
                <Grid item xs={12} sm={12} md={6}>
                  <Card>
                    Đang điều trị nội trú
                    <MyPieChart
                      data={dangdieutrinoitru}
                      colors={colors}
                      other={{ height: 175 }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <CardXuTriNoiTru />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Card>
                    {/* <CardHeader title={"Cận lâm sàng nội trú"} sx={{fontSize:'0.5rem'}} /> */}
                    <Typography sx={{ fontSize:'1.2rem' }}>
                      
                    Cận lâm sàng nội trú
                    </Typography>
                    <BarAPexChart
                      data={dataCLSNoiTru}
                      categories={[
                        "Xét nghiệm",
                        "XQuang",
                        "CT SCanner",
                        "MRI",
                        "Siêu âm",
                        "Đo chức năng hô hấp",
                        "Đo mật độ loãng xương",
                        "Nội soi",
                        "Điện não đồ",
                        "Điện tim đồ",
                      ]}
                    />
                  </Card>
                </Grid>


                <Grid item xs={12} sm={12} md={12}>
                  <Card sx={{ backgroundColor: "#1D1D1D" }}>
                    <CardHeader title={"Tình hình sử dụng giường"} />
                    <Grid container spacing={1}>
                {/* Grid items bên trong Card */}
                <Grid item xs={12} sm={12} md={6}>
                  <Card >
                    Giường công lập
                    <MyPieChart
                      data={giuongconglap}
                      colors={colors}
                      other={{ height: 175 }}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Card>
                   Giường yêu cầu
                    <MyPieChart
                      data={giuongyeucau}
                      colors={colors}
                      other={{ height: 175 }}
                    />
                  </Card>
                </Grid>

              </Grid>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Stack>
  );
};

export default DieuHanh;
